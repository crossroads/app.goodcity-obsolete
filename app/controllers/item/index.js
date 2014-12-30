import Ember from "ember";

export default Ember.ObjectController.extend({

  actions: {
    removeItem: function(item) {
      if(confirm("Are you sure? This cannot be undone.")) {
        item.get('offer.items').removeObject(item);
        item.destroyRecord();
        this.transitionToRoute("offer.offer_details");
      }
    }
  }
});
