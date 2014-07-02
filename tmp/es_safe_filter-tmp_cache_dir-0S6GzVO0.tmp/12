import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    addItem: function() {
      this.transitionToRoute('items.new');
    }
  },

  // get count of all items
  itemCount: function () {
    // return 0;
    return this.get('length');
  }.property('@each')
});
