import Ember from 'ember';

export default Ember.ObjectController.extend({

  needs: ['subscriptions'],

  isLoggedIn: Ember.computed.notEmpty('session.authToken'),
  currentLanguage: Ember.computed.readOnly('Ember.I18n.translations.language'),

  actions: {
    logMeOut: function(){
      this.get('controllers.subscriptions').send('unwire');
      this.session.clear();
      this.store.init();
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
        if (reason.responseJSON.error === "Expired token") {
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
