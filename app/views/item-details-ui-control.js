import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'item-details-ui-control',
  tagName: 'div',
  attributeBindings: ["value", "itemid", "itemtypeid", "itemtypename", "name", "itemval",
    "width", "height", "length", "quantity", "comment", "subItemtypes", "packageTypeId",
    "packagetype", "pkgid"],

  value: null,
  itemtypename: null,
  itemid: null,
  width: null,
  heigth: null,
  length: null,
  quantity: null,
  isHide: true,
  subItemtypes: null,
  pkgid: null,

  actions: {
    hideComment: function(){
      return this.toggleProperty('isHide');
    }
  }
});
