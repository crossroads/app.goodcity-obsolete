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

      // if current user is sender then still process updateStore
      // in case object was created or updated in API instead of APP,
      // however updateStore message is sent before response to APP save
      // so add 2 sec delay to allow save response to be processed first.

      // we don't need to delay updates, in fact if we do delay updates we risk
      // processing someone elses update before ours even though ours occurred first

      var fromCurrentUser = parseInt(data.sender.user.id) === parseInt(this.session.get("currentUser.id"));

      if (["create","delete"].contains(data.operation) && fromCurrentUser) {
        Ember.run.later(this, this._processUpdateStore, data, 2000);
      } else {
        Ember.run.next(this, this._processUpdateStore, data);
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

    if (data.operation === "update" && !existingItem) {
      this.store.find(type, item.id);
    } else if (["create","update"].contains(data.operation)) {
        this.store.push(type, item);
    } else if (existingItem) { //delete
      this.store.unloadRecord(existingItem);
    }
  }
});
