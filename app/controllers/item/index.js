import Ember from "ember";

export default Ember.ObjectController.extend({

  displayMessage: true,
  filteredContent: Ember.computed.filterBy('messages', 'isPrivate', false),

  actions: {
    back: function() {
      this.transitionToRoute("offer");
    },

    removeItem: function() {
      if(confirm("Are you sure? This cannot be undone.")) {
        var item = this.get('model');
        item.get('offer.items').removeObject(item);
        item.destroyRecord();
        this.transitionToRoute("offer.offer_details");
      }
    }
  }
});
