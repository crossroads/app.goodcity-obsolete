import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  attributeBindings: [ "itemval", "name", "value", "class", "titlevalue", "titleid"],

  selectedItemTypeId: Ember.computed.alias('name'),
  selectedItemTypeName:  Ember.computed.alias('value'),

});
