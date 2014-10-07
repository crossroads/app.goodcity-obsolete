import Ember from 'ember';

export default Ember.ArrayController.extend({

  needs: ['application', 'offer'],

  reviewer: Ember.computed.alias('offer.reviewedBy'),
  currentOfferId: Ember.computed.alias('controllers.offer.id'),
  currentUser: Ember.computed.alias('controllers.application.currentUser'),
  isReviewer: Ember.computed.alias('currentUser.isReviewer'),

  offer: function() {
    var offerId = this.get('currentOfferId');
    return this.store.getById('offer', offerId);
  }.property('currentOfferId'),

  actions: {
    startReview: function() {
      var reviewedBy = this.get('currentUser');
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
