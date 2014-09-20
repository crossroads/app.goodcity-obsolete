import Ember from 'ember';

export default Ember.ArrayController.extend({
  content: [],
  sortProperties: ['submittedAt'],
  sortAscending: false,
  newOffers: true
});
