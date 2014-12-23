import Ember from 'ember';

export default Ember.ObjectController.extend({
  offer: Ember.computed.alias('model'),
  isSubmittedOffer: Ember.computed.alias('offer.isSubmitted'),
  isReviewedOffer: Ember.computed.alias('offer.isReviewed'),
});
