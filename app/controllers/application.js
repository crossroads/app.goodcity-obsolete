import Ember from 'ember';

export default Ember.ObjectController.extend({

  needs: ['subscriptions'],

  isReviewer: function(key, value) {
    if(arguments.length > 1) {
      localStorage.isReviewer = value;
    }
    return localStorage.isReviewer === "true";
  }.property(),

  currentUserId: function(key, value) {
    if (arguments.length > 1) {
      localStorage.currentUserId = value;
    }
    return parseInt(localStorage.currentUserId);
  }.property(),

  isLoggedIn: function(key, value) {
    return (arguments.length > 1 ? value : (localStorage.jwt === undefined ? false : true));
  }.property(),

  currentLanguage: function() {
    return Ember.I18n.translations.language;
  }.property(),

  actions: {
    logMeOut: function(){
      this.get('controllers.subscriptions').send('unwire');
      delete localStorage.jwt;
      delete localStorage.step1_token;
      delete localStorage.currentUserId;
      this.set("isLoggedIn", false);
      window.Goodcity.reset();
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
