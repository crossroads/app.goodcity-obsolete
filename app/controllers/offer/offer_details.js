import Ember from 'ember';

var offerDetails = Ember.ObjectController.extend({

  sortProperties: ["lastMessage.createdAt:desc"],
  sortedItems: Ember.computed.sort("offerAndItems", "sortProperties"),
  staffMessagesPage: Ember.computed.alias('session.currentUser.isStaff'),

  offerAndItems: function() {
    var elements = this.get('items').rejectBy('state', 'draft').toArray();
    // add offer to array for general messages display
    elements.push(this);
    return elements;
  }.property('items.@each.state'),

});

export default offerDetails;
