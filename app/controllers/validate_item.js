import Ember from 'ember';

var ValidateItem = Ember.ObjectController.extend({

  invalidDescription: function() {
    return Ember.isBlank(this.get('donorDescription'));
  }.property('donorDescription'),

  addError: function(key, value){
    return (arguments.length > 1) ? value : false;
  }.property(),

  actions: {
    removeError: function(){
      this.set("addError", false);
    }
  }
});

export default ValidateItem;
