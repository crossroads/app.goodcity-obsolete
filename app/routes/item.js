import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('item', params.item_id);
  },

  actions: {
    back: function() {
      this.transitionTo('offer');
    }
  }
});
