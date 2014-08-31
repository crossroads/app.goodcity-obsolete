import Ember from 'ember';

export default Ember.ObjectController.extend({

  actions: {
    startDelivery: function() {
      this.transitionToRoute('offer.book_timeslot');
    }
  }
});
