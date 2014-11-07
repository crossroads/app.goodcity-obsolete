import Ember from 'ember';

export default Ember.View.extend({

  attributeBindings: ['titlevalue', 'titleid'],
  templateName: 'item-title-ui-control',
  isHide: true,

  click: function(event) {
    var selectedEleClass = event.toElement.className;
    if((/fa-plus/i.test(selectedEleClass)) || (/fa-minus/i.test(selectedEleClass))) {
      this.toggleProperty('isHide');
    }
  },
});
