import Ember from 'ember';

export default Ember.View.extend({
  tagName: "input",
  type: "radio",
  attributeBindings: [ "name", "type", "value", "checked:checked:", "labelText" ],

  click: function() {
    this.set("selection", this.$().val());
  },

  checked: function() {
    if(Ember.$.trim(this.labelText).length > '0'){
      return true;
    } else {
      return this.get("value") === this.get("selection");
    }
  }.property('selection'),

});
