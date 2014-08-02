import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    back: function() {
      this.transitionTo('offer');
    }
  }
});
