import Ember from 'ember';

export default Ember.ObjectController.extend({

  itemsById: function() {
    return this.get('items').sortBy('id');
  }.property('items.[]'),

  actions: {
    addItem: function() {
      localStorage.currentOffer = this.content.id;
      this.transitionToRoute('items.new');
    },

    cancelOffer: function(offer){
      var items = offer.get('items').content;
      items.forEach(function(item) {
        item.unloadRecord();
      });

      offer.destroyRecord();
      this.transitionToRoute('offers');
    },

    removeItem: function(item) {
      this.get('items').removeObject(item);
      item.destroyRecord();
    }
  }
});
