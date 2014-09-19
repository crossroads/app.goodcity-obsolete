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
      for(var channel in channels){
        controller.pusher.unwire(controller, channel, channels[channel]);
      }
    },

    // each action below is an event in a channel
    message: function(data){
      this.store.pushPayload(data);
    }

  },

  init: function() {
    this._super();
    this.send('wire');
  }

});
