import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'item-details-ui-control',
  tagName: 'div',
  attributeBindings: ["value", "itemid", "itemtypename", "name", "itemval",
    "width", "height", "length", "quantity", "comment"],

  value: null,
  itemtypename: null,
  itemid: null,
  width: null,
  heigth: null,
  length: null,
  quantity: null,
  isHide: true,

  actions: {
    hideComment: function(){
      return this.toggleProperty('isHide');
    }
  }
});
