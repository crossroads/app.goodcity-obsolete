import Ember from 'ember';

export default Ember.Controller.extend(EmberPusher.Bindings, {

  pusherChannelName: function(key, value){
    return (arguments.length > 1 ? value : '');
  }.property(),

  actions: {

    setupSubscriptions: function() {
      var subscription = {};
      if(localStorage.currentUserId !== undefined){
        // User Channel
        this.set("pusherChannelName", "user_" + localStorage.currentUserId);
        subscription[this.get("pusherChannelName")] = ['message'];

        // Reviewer Channel
        subscription["reviewer"] = ['message'];

        // Subscriber Channel
        subscription["supervisors"] = ['message'];

        // Assign subscription channels
        this.PUSHER_SUBSCRIPTIONS = subscription;
      }
    },

    wire: function() {
      this.set("pusherChannelName", "user_" + localStorage.currentUserId);
      this.pusher.wire(this, this.get("pusherChannelName"), ['message']);

      // connect to reviewer channel
      this.pusher.wire(this, "reviewer", ['message']);

      // connect to superviser channel
      this.pusher.wire(this, "supervisors", ['message']);
    },

    unwire: function() {
      this.pusher.unwire(this, this.get("pusherChannelName"));

      // disconnect reviewer channel
      this.pusher.unwire(this, "reviewer");

      // disconnect supervisors channel
      this.pusher.unwire(this, "supervisors");
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
