import Ember from 'ember';

export default Ember.ObjectController.extend({

  actions: {
    back: function() {
      this.transitionToRoute('offer');
    },
  }

});
