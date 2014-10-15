import Ember from 'ember';

export default Ember.Controller.extend(EmberPusher.Bindings, {

  actions: {

    wire: function() {
      var controller = this;
      var channels = this.get('session.currentUser.subscriptions') || {};
      for (var channel in channels) {
        controller.pusher.wire(controller, channel, channels[channel]);
      }
    },

    unwire: function() {
      var controller = this;
      var channels = this.get('session.currentUser.subscriptions');
      var bindings = this.pusher.get("bindings");
      for(var channel in channels) {
        if (typeof bindings[channel] !== "undefined") {
          controller.pusher.unwire(controller, channel, channels[channel]);
        }
      }
    },

    // each action below is an event in a channel
    updateStore: function(data){
      this.store.pushPayload(data);

      // pushPayload does not update hasMany relationship
      // https://github.com/emberjs/data/issues/1864
      var offerId = data.message && data.message.offerId;
      if(offerId) {
        var offer = this.store.getById('offer', offerId);
        var message = this.store.getById('message', data.message.id);
        offer.get('messages').addObject(message);
      }
    },

  }
});
