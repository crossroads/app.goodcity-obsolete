import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    next: function() {
      this.transitionToRoute('items.add_item');
    },
  },

});
