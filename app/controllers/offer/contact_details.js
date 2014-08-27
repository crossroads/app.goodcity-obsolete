import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    saveContactDetails: function() {
      this.transitionToRoute('offer.thank_offer');
    }
  }
});
