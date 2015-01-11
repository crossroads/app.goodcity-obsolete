import Ember from 'ember';

var offerDetails = Ember.ObjectController.extend({

  sortProperties: ["lastMessage.createdAt:desc"],
  sortedItems: Ember.computed.sort("offerWithItems", "sortProperties"),
  staffMessagesPage: Ember.computed.alias('session.currentUser.isStaff'),

  offerWithItems: function() {
    var elements = this.get('items.content');
    elements.push(this);
    return elements.uniq();
  }.property('model', 'items.@each', 'items.@each.messages.@each', 'messages.@each'),

});

export default offerDetails;
