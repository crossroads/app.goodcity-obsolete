import Ember from 'ember';

var offerDetails = Ember.ObjectController.extend({

  sortProperties: ["updatedAt:desc", "lastMessage.createdAt:desc"],
  sortedItems: Ember.computed.sort("offerAndItems", "sortProperties"),
  staffMessagesPage: Ember.computed.alias('session.currentUser.isStaff'),

  firstEverItem: function(){
    var currentDateTime = new Date();
    var itemCreated = new Date(this.get("createdAt").getTime() + 120000);

    if((this.get("offersCount") === 1 ) &&
       (this.get("itemCount") === 1) &&
       (currentDateTime <= itemCreated)) {
      return true;
    }
    else {
      return false;
    }
   }.property("offers.count", "items.count"),

  offerAndItems: function() {
    // avoid deleted-items which are not persisted yet.
    var elements = this.get('items').rejectBy('state', 'draft').rejectBy('isDeleted', true).toArray();

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
