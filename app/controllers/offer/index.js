import Ember from 'ember';

export default Ember.ObjectController.extend({

  isDrafted: function(){
    return this.get('state') === 'draft';
  }.property('state'),

  actions: {
    addItem: function() {
      localStorage.currentOffer = this.content.id;
      this.transitionToRoute('items.new');
    },

    removeItem: function(item) {
      this.get('items').removeObject(item);
      item.destroyRecord();
    }
  }
});
