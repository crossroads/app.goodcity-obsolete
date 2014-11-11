import Ember from 'ember';
import config from '../config/environment';

export default Ember.ObjectController.extend({

  needs: ['subscriptions'],

  isLoggedIn: Ember.computed.notEmpty('session.authToken'),
  currentLanguage: Ember.computed.readOnly('Ember.I18n.translations.language'),

  actions: {
    logMeOut: function(){
      this.get('controllers.subscriptions').send('unwire');
      this.session.clear();
      this.store.init();
      var _this = this;
      config.APP.PRELOAD_TYPES.forEach(function(type) {
        _this.store.find(type);
      });
      this.transitionToRoute('login');
    },
    logMeIn: function(userId){
      this.set("session.currentUserId", userId);
      this.send('setSubscriptions');
    },
    setSubscriptions: function() {
      this.get('controllers.subscriptions').send('wire');
    },
    error: function(reason) {
      if (reason.status === 401) {
        if (this.session.currentUserId) {
          this.controllerFor('application').send('logMeOut');
        }
        else {
          this.transitionTo('login');
        }
      } else {
        alert('Something went wrong');
        Ember.Logger.error(reason);
      }
    }
  },

  init: function() {
    var _this = this;
    this.send('setSubscriptions');
    Ember.RSVP.on('error', function(error) {
      _this.send('error', error);
    });
    this._super();
  }

});
