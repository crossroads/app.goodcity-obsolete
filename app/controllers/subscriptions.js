import Ember from 'ember';

export default Ember.Controller.extend(EmberPusher.Bindings, {
  needs: ["notifications"],

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
    updateStore: function(data) {
      this.store.pushPayload(data.sender);

      // if current user is sender then still process updateStore in case object was
      // created in API instead of APP, however updateStore message is sent before response
      // to APP save so add 2 sec delay to allow save response to be processed first
      if (parseInt(data.sender.user.id) === parseInt(this.session.get("currentUser.id"))) {
        Ember.run.later(this, this._processUpdateStore, data, 2000);
      } else {
        Ember.run.bind(this, this._processUpdateStore, data);
      }
    },

    notification: function(data) {
      data.date = new Date(data.date);
      this.get("controllers.notifications").pushObject(data);
    }
  },

  _processUpdateStore: function(data) {
    var type = Object.keys(data.item)[0];
    var item = this.store.normalize(type, data.item[type]);
    var existingItem = this.store.getById(type, item.id);

    if (data.operation === "create" && existingItem) {
      this.store.update(type, item);
    } else if (data.operation === "create") {
      this.store.push(type, item);
    } else if (data.operation === "update" && !existingItem) {
      this.store.find(type, item.id);
    } else if (data.operation === "update") {
      this.store.update(type, item);
    } else if (existingItem) { //delete
      this.store.unloadRecord(existingItem);
    }
  }
});
