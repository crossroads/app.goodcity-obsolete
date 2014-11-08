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
    if (session.get('currentUserId')) {
      promises.push(store.find("user", session.get('currentUserId')));
      promises = promises.concat(retrieve(config.APP.PRELOAD_AUTHORIZED_TYPES));
    }

    Ember.RSVP.allSettled(promises).finally(function() {
      application.advanceReadiness();
      Ember.$("#splashScreen").remove();
    });
  }
};
