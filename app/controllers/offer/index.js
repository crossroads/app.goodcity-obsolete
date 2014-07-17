import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    addItem: function() {
      this.transitionToRoute('items.new');
    }
  }
});
