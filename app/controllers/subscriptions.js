import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  needs: ["notifications", "application"],
  socket: null,
  created: null,

  actions: {
    wire: function() {
      var name = this.session.get("currentUser.fullName");
      Ember.run.next(function() { Ember.$("#ws-status").text("Offline - " + name); });
      var connectUrl = config.APP.SOCKETIO_WEBSERVICE_URL + "?token=" + encodeURIComponent(this.session.get("authToken"));
      var socket = io(connectUrl, {autoConnect:false});
      this.set("created", Date.now());
      this.set("socket", socket);
      socket.on("connect", function() { Ember.$("#ws-status").text("Online - " + name); });
      socket.on("disconnect", function() { Ember.$("#ws-status").text("Offline - " + name); });
      socket.on("error", Ember.run.bind(this, function(data) { throw new Error("websocket: " + data); }));
      socket.on("notification", Ember.run.bind(this, this.notification));
      socket.on("update_store", Ember.run.bind(this, this.update_store));
      socket.on("batch", Ember.run.bind(this, this.batch));
      socket.on("resync", Ember.run.bind(this, this.resync));
      socket.connect(); // manually connect since it's not auto-connecting if you logout and then back in
    },

    unwire: function() {
      var socket = this.get("socket");
      if (socket) {
        socket.close();
        this.set("socket", null);
      }
      Ember.$("#ws-status").text("Offline");
    }
  },

  batch: function(events, success) {
    // if ember recently loaded (current data store already up to date) or not logged in ignore batch event
    if (Date.now() - this.get("created") < 2000 || !this.get("controllers.application.isLoggedIn")) {
      success();
      return;
    }

    var emptyFunc = function() {};
    events.forEach(function(args) {
      var event = args[0];
      this[event].apply(this, args.slice(1).concat(emptyFunc));
    }, this);

    success();
  },

  resync: function() {
    window.location = window.location.href;
  },

  notification: function(data) {
    data.date = new Date(data.date);
    this.get("controllers.notifications").pushObject(data);
  },

  // each action below is an event in a channel
  update_store: function(data, success) {
    this.store.pushPayload(data.sender);

    var type = Object.keys(data.item)[0];
    var item = this.store.normalize(type, data.item[type]);
    var existingItem = this.store.getById(type, item.id);

    // update_store message is sent before response to APP save so ignore
    var fromCurrentUser = parseInt(data.sender.user.id) === parseInt(this.session.get("currentUser.id"));
    var hasNewItemSaving = this.store.all(type).some(function(o) { return o.id === null && o.get("isSaving"); });
    var existingItemIsDeleting = existingItem && existingItem.get("isDeleted") && existingItem.get("isSaving");
    if (data.operation === "create" && fromCurrentUser && hasNewItemSaving ||
      data.operation === "delete" && fromCurrentUser && existingItemIsDeleting) {
      return;
    }

    if (data.operation === "update" && !existingItem) {
      this.store.find(type, item.id);
    } else if (["create","update"].contains(data.operation)) {
        this.store.push(type, item);
    } else if (existingItem) { //delete
      this.store.unloadRecord(existingItem);
    }

    success();
  }
});
