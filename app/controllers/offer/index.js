import Ember from 'ember';

export default Ember.ObjectController.extend({
  itemsById: function() {
    return this.get("items").sortBy("id")
      .filter(function(item) { return item.get("state") !== "draft"; });
  }.property("items"),

  actions: {
    addItem: function() {
      var draftItemId = this.get("items").filterBy("state", "draft").get("firstObject.id") || "new";
      this.transitionToRoute('item.edit_images', draftItemId);
    },

    cancelOffer: function(offer){
      if(confirm("Are you sure? This cannot be undone.")) {
        var items = offer.get('items').content;
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
