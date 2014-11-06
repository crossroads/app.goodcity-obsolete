import Ember from 'ember';

export default Ember.TextField.extend({
  tagName: "input",
  type: "text",
  attributeBindings: [ "name", "type", "value", "maxlength", "data-actual-mobile", "id" ],

  keyDown: function(e) {

    var key = e.charCode || e.keyCode || 0;
    // allow enter, backspace, tab, delete, arrows, numbers, keypad numbers
    // home, end only.
    return (
        key == 13 ||
        key == 8 ||
        key == 9 ||
        key == 46 ||
        (key >= 35 && key <= 40) ||
        (key >= 48 && key <= 57) ||
        (key >= 96 && key <= 105));
  },
});
