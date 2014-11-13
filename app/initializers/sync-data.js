import Ember from 'ember';
import config from '../config/environment';

export default {
  name: 'sync-data',
  after: ['session','store'],

  initialize: function(container, application) {
    application.deferReadiness();

    var session = container.lookup('session:current');
    var store = container.lookup('store:main');
    var retrieve = function(types) {
      return types.map(function(type) { return store.find(type); });
    };
    var promises = retrieve(config.APP.PRELOAD_TYPES);

    //if logged in
    if (session.get('authToken') && session.get('currentUserId')) {
      promises.push(new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.ajax({
          dataType: "json",
          url: config.APP.SERVER_PATH + "/auth/current_user_profile",
          headers: { Authorization: "Bearer " + session.get("authToken") },
          success: function(data) { Ember.run(function() { store.pushPayload(data); resolve(); }); },
          error: function(jqXHR) { Ember.run(function() { reject(jqXHR); }); }
        });
      }));

      promises = promises.concat(retrieve(config.APP.PRELOAD_AUTHORIZED_TYPES));
    }

    Ember.RSVP.allSettled(promises)
      .then(function(results) {
        var rejected = results.filter(function(item) { return item.state === "rejected"; });

        if (rejected.some(function(item) { return item.reason.status === 401; })) {
          session.clear();
          window.location = config.baseURL;
        }
        else if (rejected.length > 0) {
          rejected.forEach(function(item) { Ember.Logger.error(item.reason); });
          alert('Something went wrong');
        }
      })
      .finally(function() {
        application.advanceReadiness();
        Ember.$("#splashScreen").remove();
      });
  }
};
