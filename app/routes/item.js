import Ember from 'ember';

var offer = Ember.Route.extend({
  model: function(params) {
    return this.store.find('item', params.item_id);
  }
});

export default offer;
