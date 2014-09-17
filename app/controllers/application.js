import Ember from 'ember';

export default Ember.ObjectController.extend(EmberPusher.Bindings, {

  pusherChannelName: function(key, value){
    return (arguments.length > 1 ? value : '');
  }.property(),

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
      window.Goodcity.reset();
      this.pusher.unwire(this, this.get("pusherChannelName"));
    },
    logMeIn: function(user_id){
      this.set("isLoggedIn", true);
      this.set("currentUserId", user_id);
      this.set("pusherChannelName", "user_" + localStorage.currentUserId);
      this.pusher.wire(this, this.get("pusherChannelName"), ['message']);
    },
    message: function(data){
      this.store.pushPayload(data);
    }
  },

  init: function() {
    var subscription = {};
    if(localStorage.currentUserId !== undefined){
      this.set("pusherChannelName", "user_" + localStorage.currentUserId);
      subscription[this.get("pusherChannelName")] = ['message'];
      this.PUSHER_SUBSCRIPTIONS = subscription;
    }
    this._super();
  }
});
