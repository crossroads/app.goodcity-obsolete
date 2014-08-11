import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    addDetails: function() {
      this.transitionToRoute('items.add_item');
    },
  },

});
