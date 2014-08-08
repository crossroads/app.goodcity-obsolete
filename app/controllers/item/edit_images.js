import Ember from 'ember';

export default Ember.ObjectController.extend({

  actions: {
    updateDetails: function() {
      this.transitionToRoute('item.edit');
    },

    back: function() {
      this.transitionToRoute('item.edit');
    }

  },

});
