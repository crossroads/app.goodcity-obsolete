import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['reviewedAt'],
  sortAscending: false,
  myOffers: true
});
