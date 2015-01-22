import Ember from 'ember';

var offerDetails = Ember.ObjectController.extend({

  sortProperties: ["updatedAt:desc", "lastMessage.createdAt:desc"],
  sortedItems: Ember.computed.sort("offerAndItems", "sortProperties"),
  staffMessagesPage: Ember.computed.alias('session.currentUser.isStaff'),

  offerAndItems: function() {
    var elements = this.get('items').rejectBy('state', 'draft').toArray();
    // add offer to array for general messages display
    elements.push(this);
    return elements;
  }.property('items.@each.state'),

  hasMultipleOffers: function(){
    return this.store.all('offer').get('length') > 1;
  }.property('model'),

  actions: {
    addItem: function() {
      var draftItemId = this.get("items").filterBy("state", "draft").get("firstObject.id") || "new";
      this.transitionToRoute('item.edit_images', draftItemId);
    },

    cancelOffer: function(offer){
      if(confirm("Are you sure? This cannot be undone.")) {
        var items = offer.get('items').toArray();
        items.forEach(function(item) {
          item.unloadRecord();
        });

        var route = this;
        offer.destroyRecord().then(function(){
          route.transitionToRoute('offers.index');
        });
      }
    },
  }

});

export default offerDetails;
