import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    addItem: function() {
      this.transitionToRoute('items.new');
    }
  },

  // get count of all items
  itemCount: function () {
    return this.get('items.length');
  }.property('items.@each')
});
