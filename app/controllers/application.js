import Ember from 'ember';

export default Ember.ObjectController.extend({

  needs: ['subscriptions'],

  currentUser: function(key, value){
    if (arguments.length > 1) {
      return value;
    } else {
      return this.store.getById('user', this.get('currentUserId'));
    }
  }.property(),

  currentUserId: function(key, value) {
    if (arguments.length > 1) {
      localStorage.currentUserId = value;
    }
    return parseInt(localStorage.currentUserId);
  }.property(),

  isLoggedIn: function(key, value) {
    return (arguments.length > 1 ? value : (Ember.isNone(this.get('session.authToken')) ? false : true));
  }.property(),

  currentLanguage: function() {
    return Ember.I18n.translations.language;
  }.property(),

  actions: {
    logMeOut: function(){
      this.get('controllers.subscriptions').send('unwire');
      this.set("session.authToken", null);
      delete localStorage.step1_token;
      delete localStorage.currentUserId;
      this.set("currentUser", null);
      this.set("isLoggedIn", false);
      //TODO figure out how to retrieve App variable
      //App.reset();
    },
    logMeIn: function(userId){
      this.set("isLoggedIn", true);
      this.set("currentUserId", userId);
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
