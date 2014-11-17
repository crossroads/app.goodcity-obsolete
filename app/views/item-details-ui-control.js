import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'item-details-ui-control',
  tagName: 'div',
  attributeBindings: ["value", "name", "itemval", "width", "height", "length", "qty"],

  click: function(event) {
    var selectedEleClass = event.toElement.className;
    if((/fa-plus/i.test(selectedEleClass)) || (/fa-minus/i.test(selectedEleClass))) {
      this.toggleProperty('isHide');
    }
  },
  width: null,
  heigth: null,
  length: null,
  qty: null,
  value: null
});
