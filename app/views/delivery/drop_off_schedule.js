import Ember from 'ember';

export default Ember.View.extend({
  // didInsertElement: function() {
  //   Ember.$().ready(function(){
  //     validateForm();
  //     validateInputs();
  //   });

  //   function validateForm(){
  //     Ember.$('.drop_off').click(function(){
  //       return checkInput(Ember.$('.pickadate'));
  //     });
  //   }

  //   function validateInputs(){
  //     Ember.$('.pickadate').focusout(function(){
  //       return checkInput(this);
  //     });
  //     Ember.$('.pickadate').focus(function(){
  //       return removeHighlight(this);
  //     });
  //   }

  //   function checkInput(element){
  //     var parent = Ember.$(element).parent();
  //     var value = Ember.$(element).val();

  //     if(value === undefined || value.length === 0) {
  //       parent.addClass('has-error');
  //     } else {
  //       parent.removeClass('has-error');
  //     }
  //   }

  //   function removeHighlight(element){
  //     var parent = Ember.$(element).parent();
  //     parent.removeClass('has-error');
  //   }
  // }
});
