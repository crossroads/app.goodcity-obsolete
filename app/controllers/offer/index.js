import Ember from 'ember';

export default Ember.ObjectController.extend({
  itemsById: function() {
    return this.get("items").sortBy("id")
      .filter(function(item) { return item.get("state") !== "draft"; });
  }.property("items"),

 firstEverItem: function(){
  var currentDateTime = new Date();
  var itemCreated = new Date(this.get("createdAt").getTime() + 120000);
  console.log('current: ', currentDateTime);
  console.log('itemCreated: ', itemCreated);
  console.log('diff: ', itemCreated - currentDateTime );

  if((this.get("offersCount") === 1 ) && (this.get("itemCount") === 1) && (currentDateTime <= itemCreated))
  {
    return true;
  }
  else
    { return false;}
 }.property("offers.count", "items.count"),

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
    }
  }
});
