import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    addDetails: function() {
      this.transitionToRoute('items.add_item');
    }
  }
});
