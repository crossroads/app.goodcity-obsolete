import Ember from 'ember';

export default Ember.ObjectController.extend({

  donorConditions: function() {
    return this.store.all('donor_condition').sortBy('id');
  }.property('donor_condition.[]'),

});
