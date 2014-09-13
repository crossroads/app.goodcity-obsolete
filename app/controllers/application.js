import Ember from 'ember';

export default Ember.ObjectController.extend(EmberPusher.Bindings, {

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

  unreadMessage: function() {
    return this.store.all('message').get('firstObject');
  }.property(),

  actions: {
    logMeOut: function(){
      delete localStorage.jwt;
      delete localStorage.step1_token;
      delete localStorage.currentUserId;
      this.set("isLoggedIn", false);
      this.transitionToRoute('login');
    },
    logMeIn: function(user_id){
      this.set("isLoggedIn", true);
      this.set("currentUserId", user_id);
    },
    message: function(data){
      this.store.pushPayload(data);
    }
  },

  init: function(data){
    var subscription = {};
    if(localStorage.currentUserId !== undefined){
      subscription["user_" + localStorage.currentUserId] = ['data'];
      this.PUSHER_SUBSCRIPTIONS = subscription;
    }
    this._super();
  }
});
