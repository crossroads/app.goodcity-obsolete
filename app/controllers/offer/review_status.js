import Ember from 'ember';

export default Ember.ObjectController.extend({

  awaitingReview: Ember.computed.filterBy('content', 'state', 'draft'),
  rejected: Ember.computed.filterBy('content', 'state', 'rejected'),

});
