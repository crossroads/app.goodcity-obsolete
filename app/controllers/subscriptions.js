import Ember from 'ember';

export default Ember.Controller.extend(EmberPusher.Bindings, {
  currentUserId: function() {
    return localStorage.currentUserId;
  }.property().volatile(),

  actions: {

    wire: function() {
      var userId = this.get('currentUserId');
      var controller = this;
      if(userId) {
        return this.store.find('user', this.get('currentUserId')).then( function(user) {
          var channels = user.get('subscriptions');
          for(var channel in channels){
            controller.pusher.wire(controller, channel, channels[channel]);
          }
        });
      }
    },

    unwire: function() {
      var controller = this;
      var user = this.store.getById('user', this.get('currentUserId'));
      var channels = user.get('subscriptions');
      var bindings = this.pusher.get("bindings");
      for(var channel in channels){
        if (typeof bindings[channel] !== "undefined")
          controller.pusher.unwire(controller, channel, channels[channel]);
      }
    },

    // each action below is an event in a channel
    updateStore: function(data){
      this.store.pushPayload(data);
    },

  }
});
