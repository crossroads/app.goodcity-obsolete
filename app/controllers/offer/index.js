import Ember from 'ember';

export default Ember.ObjectController.extend({

  itemsById: function() {
    return this.get('items').sortBy('id');
  }.property('items.[]'),

  actions: {
    addItem: function() {
      localStorage.currentOffer = this.get("id");
      this.transitionToRoute('items.new');
    },

    cancelOffer: function(offer){
      if(confirm("Are you sure? This cannot be undone.")) {
        var items = offer.get('items').content;
        items.forEach(function(item) {
          item.unloadRecord();
        });

        var route = this;
        offer.destroyRecord().then(function(){
          if(!(offer.isSaving || offer.isDirty)) {
            route.transitionToRoute('offers.index');
          }
        });
      }
    },

    removeItem: function(item) {
      if(confirm("Are you sure? This cannot be undone.")) {
        this.get('items').removeObject(item);
        item.destroyRecord();
      }
    }
  }
});
