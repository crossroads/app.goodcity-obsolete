import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    assignSchedule: function() {
      this.transitionToRoute('offer.contact_details');
    }
  }
});
