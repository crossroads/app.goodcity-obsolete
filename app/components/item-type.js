import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['selectedItemId', 'selectedItemName'],
  selectedItype: {id: null},
  selectedItemId: null,
  selectedItemName: "",

  selectedItypeObserver: function(){
    return this.set('selectedItemName', this.get('findSelectedItem').get('name'));
  }.observes('selectedItemId'),

  change: function(value) {
    this.set('selectedItemId',value.val);
    this.sendAction('getItemId', this.get('selectedItemId'), this.get('selectedItemName'));
    return;
  },

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

  findSelectedItem: function(){
    var store = this.get('targetObject.store');
    return store.getById('item_type', this.get('selectedItemId'));
  }.property('selectedItemId'),
});
