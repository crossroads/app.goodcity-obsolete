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
      delete localStorage.jwt;
      delete localStorage.step1_token;
      delete localStorage.currentUserId;
      this.set("isLoggedIn", false);
      this.get('controllers.subscriptions').send('unwire');
      window.Goodcity.reset();
    },
    logMeIn: function(user_id){
      this.set("isLoggedIn", true);
      this.set("currentUserId", user_id);
      this.get('controllers.subscriptions').send('wire');
    }
  },

  init: function() {
    this.get('controllers.subscriptions').init();
    this._super();
  }
});
