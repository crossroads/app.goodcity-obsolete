import Ember from 'ember';

export default Ember.ObjectController.extend({

  sortProperties: ["lastMessage.createdAt:desc"],
  sortedItems: Ember.computed.sort("offerWithItems", "sortProperties"),

  offerWithItems: function() {
    var elements = this.get('items').toArray();
    elements.push(this);
    return elements.uniq();
  }.property('model', 'items.@each.lastMessage'),

});
