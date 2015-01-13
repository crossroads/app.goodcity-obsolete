import Ember from 'ember';

var offerDetails = Ember.ObjectController.extend({

  sortProperties: ["lastMessage.createdAt:desc"],
  sortedItems: Ember.computed.sort("offerWithItems", "sortProperties"),
  staffMessagesPage: Ember.computed.alias('session.currentUser.isStaff'),

  offerWithItems: function() {
    var elements = this.get('items').toArray();
    elements.push(this);
    return elements.uniq();
  }.property('model', 'items.@each.lastMessage'),

});

export default offerDetails;
