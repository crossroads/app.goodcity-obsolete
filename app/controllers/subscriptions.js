import Ember from 'ember';

export default Ember.Controller.extend(EmberPusher.Bindings, {

  pusherChannelName: function(key, value){
    return (arguments.length > 1 ? value : '');
  }.property(),

  actions: {

    setupSubscriptions: function() {
      var subscription = {};
      if(localStorage.currentUserId !== undefined){
        this.set("pusherChannelName", "user_" + localStorage.currentUserId);
        subscription[this.get("pusherChannelName")] = ['message'];
        this.PUSHER_SUBSCRIPTIONS = subscription;
      }
    },

    wire: function() {
      this.set("pusherChannelName", "user_" + localStorage.currentUserId);
      this.pusher.wire(this, this.get("pusherChannelName"), ['message']);
    },

    unwire: function() {
      this.pusher.unwire(this, this.get("pusherChannelName"));
    },

    // each action below is an event in a channel
    message: function(data){
      this.store.pushPayload(data);
    }

  },

  init: function() {
    this.send('setupSubscriptions');
    this._super();
  }

});
