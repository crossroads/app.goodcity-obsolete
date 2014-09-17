import Ember from 'ember';

export default Ember.ObjectController.extend(EmberPusher.Bindings, {
  pusherChannelName: '',

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
      Ember.Logger.log("logMeOut ", this.PUSHER_SUBSCRIPTIONS);
      this.pusher.unwire(this, this.pusherChannelName);
      delete localStorage.jwt;
      delete localStorage.step1_token;
      delete localStorage.currentUserId;
      this.set("isLoggedIn", false);
      window.Goodcity.reset();
    },
    logMeIn: function(user_id){
      this.set("isLoggedIn", true);
      this.set("currentUserId", user_id);
      this.set("pusherChannelName", "user_" + localStorage.currentUserId);
      this.pusher.wire(this, this.pusherChannelName, ['message']);
      Ember.Logger.log("logMeIn ", this.PUSHER_SUBSCRIPTIONS);
    },
    message: function(data){
      this.store.pushPayload(data);
    }
  },

  init: function() {
    var subscription = {};
    if(localStorage.currentUserId !== undefined){
      subscription[this.pusherChannelName] = ['message'];
      this.PUSHER_SUBSCRIPTIONS = subscription;
      Ember.Logger.log("init ",this.PUSHER_SUBSCRIPTIONS);
    }
    this._super();
  }
});
