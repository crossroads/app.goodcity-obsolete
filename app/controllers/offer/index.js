import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    addItem: function() {
      localStorage.currentOffer = this.content.id;
      this.transitionToRoute('items.new');
    }
  }
});
