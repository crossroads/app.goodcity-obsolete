import Ember from 'ember';

export default Ember.ArrayController.extend({

  needs: ['offer'],

  offer: Ember.computed.alias('controllers.offer'),

  actions: {
    startReview: function() {
      var reviewedBy = this.get('session.currentUser');
      var offerId = this.get('offer.id');

      var offer = this.store.update('offer', {
        id: offerId,
        state_event: 'start_review',
        reviewedBy: reviewedBy
      });
      offer.save();
    }
  }

});
