import Ember from 'ember';

export default Ember.ArrayController.extend({
  content: [],
  sortProperties: ['reviewedAt'],
  sortAscending: false,
  myOffers: true
});
