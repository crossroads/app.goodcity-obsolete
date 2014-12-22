import Ember from 'ember';

export default Ember.ObjectController.extend({

  awaitingReview: Ember.computed.filterBy('items', 'state', 'submitted'),
  rejected: Ember.computed.filterBy('items', 'state', 'rejected'),
  accepted: Ember.computed.filterBy('items', 'state', 'accepted'),

});
