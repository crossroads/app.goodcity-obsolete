import Ember from 'ember';

export default Ember.TextField.extend({
  tagName: "input",
  type: "number",
  attributeBindings: [ "name", "type", "value", "maxlength", "id" ],

  keyDown: function(e) {

    var key = e.charCode || e.keyCode || 0;
    // allow ctrl+v, enter, backspace, tab, delete, numbers, keypad numbers
    // home, end only.
    return (
        (e.ctrlKey && key === 86) ||
        key === 13 ||
        key === 8 ||
        key === 9 ||
        key === 46 ||
        key === 39 ||
        (key >= 35 && key <= 37) ||
        (key >= 48 && key <= 57) ||
        (key >= 96 && key <= 105));
  },

  keyPress: function(e) {
    var key = e.charCode || e.keyCode || 0;
    var inputValue = this.value || "";
    var allowed = this.send('isAllowed', key);
    console.log(allowed);
    return allowed ? true : (inputValue.length < this.maxlength);
  },

  actions: {
    isAllowed: function(key) {
      var allowed = (key === 13 ||
        key === 8 ||
        key === 9 ||
        key === 46 ||
        key === 39 ||
        (key >= 35 && key <= 37));
      return allowed;
    }
  }
});
