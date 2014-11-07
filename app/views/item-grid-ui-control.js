import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'item-grid-ui-control',
  tagName: 'div',
  id: "width",
  type: "text",
  value: "123",
  isDisabled: true,

  focusOut: function() {
    this.set("isDisabled", true);
  },

  click: function() {
    this.set("isDisabled", false);
  },
});
