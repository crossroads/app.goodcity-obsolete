import Ember from 'ember';
import AjaxPromise from '../utils/ajax-promise';
import config from '../config/environment';

export default Ember.Route.extend({

  beforeModel: function () {
    var _this = this;

    var language = localStorage.language || Ember.I18n.default_language;
    Ember.I18n.translations = Ember.I18n.translation_store[language];

    Ember.RSVP.on('error', function(error) {
      _this.send('error', error);
    });

    //preload data
    var retrieve = function(types) {
      return types.map(function(type) { return _this.store.find(type); });
    };
    var promises = retrieve(config.APP.PRELOAD_TYPES);

    //if logged in
    if (_this.session.get('authToken')) {
      promises.push(
        new AjaxPromise("/auth/current_user_profile", "GET", _this.session.get("authToken"))
          .then(function(data) { _this.store.pushPayload(data); })
      );
      promises = promises.concat(retrieve(config.APP.PRELOAD_AUTHORIZED_TYPES));
    }

    return Ember.RSVP.allSettled(promises);
  },

  renderTemplate: function() {
    this.render(); // default template
    if(this.controllerFor('application').get("isLoggedIn")){
      this.render('notifications', {   // the template to render
        into: 'application',      // the template to render into
        outlet: 'notifications', // the name of the outlet in that template
        controller: 'notifications'   // the controller to use for the template
      });

      this.render('messages/unreadMessageCount', {
        into: 'application',
        outlet: 'unreadMessageCount',
        controller: 'messages/unread'
      });
    }
  },

  actions: {
    setLang: function(language) {
      Ember.I18n.translations = Ember.I18n.translation_store[language];
      localStorage.language = language;
      window.location.reload();
    },
    loading: function() {
      var view = this.container.lookup('view:loading').append();
      this.router.one('didTransition', view, 'destroy');
    },
    error: function(reason) {
      if (reason.status === 401) {
        if (this.get('isLoggedIn')) {
          this.send('logMeOut');
        }
        else {
          this.transitionToRoute('login');
        }
      } else {
        alert('Something went wrong');
        Ember.Logger.error(reason);
      }
    }
  }
});
