import Ember from 'ember';

export default Ember.Component.extend({
  itemTypes: function(key, value) {
    if (arguments.length > 1) {
      return value;
    }
    else {
      var sortConditions, _this = this;
      var store = this.get('targetObject.store');
      store.find('item_type').then( function(objs) {
        sortConditions = objs.sortBy('name');
        _this.set("itemTypes", sortConditions);
        value = sortConditions;
      });
      return value;
    }
  }.property('item_type.[]'),
});
