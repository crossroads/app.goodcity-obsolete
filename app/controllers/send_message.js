import Ember from 'ember';

var sendMessage = Ember.ArrayController.extend({

  needs: ["offer", "review_item"],
  sortProperties: ['createdAt'],
  sortAscending: true,
  userId: Ember.computed.alias('session.currentUser.id'),

  user: function() {
    return this.store.getById('user', this.get('userId'));
  }.property('userId'),

  allMessages: function() {
    var user = this.get('user');
    this.get('arrangedContent').forEach(function(message){
      message.set('myMessage', message.get('sender') === user);
    });
    return this.get('arrangedContent');
  }.property('arrangedContent'),

  actions: {
    sendMessage: function(is_private, for_item) {
      var newMessageProperties = this.getProperties('body');
      newMessageProperties.isPrivate = is_private;

      if(for_item) {
        var item_id = this.get('controllers.review_item.id') || this.get('controllers.item.model.id');
        var item = this.store.getById('item', item_id);
        newMessageProperties.item = item;
      }

      this.send("saveMessage", newMessageProperties);

      this.set('body', '');
      Ember.$("body").animate({ scrollTop: Ember.$(document).height() }, 1000);
    },

    sendRejectMessage: function(message) {
      var item_id = this.get('controllers.review_item.id');
      var item = this.store.getById('item', item_id);

      var newMessageProperties = { body: message };
      newMessageProperties.isPrivate = false;
      newMessageProperties.item = item;

      this.send("saveMessage", newMessageProperties);
    },

    saveMessage: function(newMessageProperties){
      var offer_id = this.get('controllers.offer').get('id');
      var offer = this.store.getById('offer', offer_id);

      newMessageProperties.offer = offer;
      newMessageProperties.myMessage = true;
      newMessageProperties.createdAt = new Date();
      newMessageProperties.sender = this.store.getById('user', this.session.get("currentUser.id"));

      var message = this.store.createRecord('message', newMessageProperties);
      message.save();
    }

  },

});

export default sendMessage;
