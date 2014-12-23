import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    Ember.$().ready(function(){
      validateForm();
    });

    function validateForm(){
      Ember.$('.drop_off').click(function(){
        return checkInput(Ember.$('.pickadate'));
      });
    }

    function checkInput(element){
      var value = Ember.$(element).val();
      return !(value === undefined || value.length === 0);
    }
  }
});
