import Ember from 'ember';

var offer = Ember.Route.extend({
  model: function(params) {
    return this.store.find('offer', params.offer_id);
  }
});

export default offer;
