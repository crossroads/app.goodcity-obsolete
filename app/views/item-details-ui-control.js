import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'item-details-ui-control',
  tagName: 'div',
  attributeBindings: ["value", "itemid", "itemtypeid", "itemtypename", "name", "itemval",
    "width", "height", "length", "quantity", "comment", "subItemtypes", "packagetypeid",
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
  packagetypeid: null,
  packagetype: null,

  didInsertElement: function () {
    if (Ember.isEmpty(this.get("quantity"))) {
      this.set("quantity", 1);
    }
  },
  actions: {
    hideComment: function(){
      return this.toggleProperty('isHide');
    }
  }
});
