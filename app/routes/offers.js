import Ember from 'ember';

var offers = Ember.Route.extend({
  model: function() {
    return this.store.find('offer');
  }
});
export default offers;
