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
    }
  },

  init: function() {
    this.send('setSubscriptions');
    this._super();
  }

});
