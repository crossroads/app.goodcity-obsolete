import Ember from 'ember';

var validateMessage = Ember.ArrayController.extend({
  invalidMessage: function() {
    return Ember.isBlank(this.get('body'));
  }.observes('body'),

  addError: function(key, value){
    return (arguments.length > 1) ? value : false;
  }.property(),

  actions: {
    removeError: function(){
      this.set("addError", false);
    },

    sendMessage: function() {
      if(this.get("invalidMessage")) {
        this.set("addError", true);
        return false;
      }
    }
  }
});

export default validateMessage;
