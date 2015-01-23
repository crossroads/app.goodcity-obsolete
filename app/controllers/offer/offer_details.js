import Ember from 'ember';

var offerDetails = Ember.ObjectController.extend({

  sortProperties: ["latestUpdatedTime:desc"],
  sortedItems: Ember.computed.sort("offerAndItems", "sortProperties"),
  staffMessagesPage: Ember.computed.alias('session.currentUser.isStaff'),

  offerAndItems: function() {
    // avoid deleted-items which are not persisted yet.
    var elements = this.get('items').rejectBy('state', 'draft').rejectBy('isDeleted', true).toArray();

    // add offer to array for general messages display
    elements.push(this);
    return elements;
  }.property('items.@each.state', 'items.@each.lastMessage'),

  displayHomeLink: function(){
    return this.store.all('offer').rejectBy('state', 'draft').get('length') > 0;
  }.property('state'),

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
