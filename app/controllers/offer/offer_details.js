import Ember from 'ember';

export default Ember.ObjectController.extend({

  sortProperties: ["lastMessage.state:desc", "lastMessage.id:desc"],
  sortedItems: Ember.computed.sort("offerWithItems", "sortProperties"),

  offerWithItems: function() {
    var content = this.get('items.content');
    content.push(this);
    return content;
  }.property(),

});
