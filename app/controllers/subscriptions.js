import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  needs: ["notifications", "application"],
  socket: null,

  actions: {
    wire: function() {
      var socket = io(config.APP.SOCKETIO_WEBSERVICE_URL + "?token=" + encodeURIComponent(this.session.get("authToken")));
      var name = this.session.get("currentUser.fullName");
      socket.on("connect", function() { Ember.$("#ws-status").text("Online - " + name); });
      socket.on("disconnect", function() { Ember.$("#ws-status").text("Offline - " + name); });
      socket.on("error", Ember.run.bind(this, function(data) { throw new Error("websocket: " + data); }));
      socket.on("notification", Ember.run.bind(this, this.notification));
      socket.on("update_store", Ember.run.bind(this, this.updateStore));
      this.set("socket", socket);
    },

    unwire: function() {
      var socket = this.get("socket");
      if (socket) {
        socket.close();
        this.set("socket", null);
      }
    }
  },

  notification: function(data) {
    data.date = new Date(data.date);
    this.get("controllers.notifications").pushObject(data);
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
