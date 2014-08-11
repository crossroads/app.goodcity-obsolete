import Ember from 'ember';

export default Ember.ObjectController.extend({

  isDraft: function(){
    return this.get('state') === 'draft';
  }.property('state'),

  itemsById: function() {
    return this.get('items').sortBy('id');
  }.property('items.[]'),

  actions: {
    addItem: function() {
      localStorage.currentOffer = this.content.id;
      this.transitionToRoute('items.new');
    },

    cancelOffer: function(offer){
      offer.destroyRecord();
      this.transitionToRoute('offers');
    },

    removeItem: function(item) {
      this.get('items').removeObject(item);
      item.destroyRecord();
    }
  }
});
