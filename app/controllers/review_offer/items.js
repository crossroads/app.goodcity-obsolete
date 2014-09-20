import Ember from 'ember';

export default Ember.ArrayController.extend({

  needs: ['application'],

  offer: function() {
    var offerId =  this.get('content.firstObject.offerId');
    return this.store.getById('offer', offerId);
  }.property('items.[]'),

  reviewer: Ember.computed.alias('offer.reviewedBy'),

  actions: {
    startReview: function() {
      var reviewedBy = this.get('controllers.application.currentUser');
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
