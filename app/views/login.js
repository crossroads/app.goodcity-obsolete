import Ember from 'ember';

export default Ember.View.extend({

  didInsertElement: function(){

    Ember.$().ready(function (){
      validate_phone();
      submitForm();
    });

    function validate_phone(){
      Ember.$('#mobile').focusout(function(){
        return is_phone_valid();
      });
      Ember.$('#mobile').focus(function(){
        remove_highlight();
      });
    }

    function submitForm(){
      Ember.$('#getsmscode').click(function(){
        return is_phone_valid();
      });
    }

    function is_phone_valid(){
      var phone = Ember.$('#mobile').val();
      if (phone.search(/^\d{8}$/) === 0) {
        remove_highlight();
        return true;
      }
      else{
        highlight_phone_field();
        return false;
      }
    }

    function highlight_phone_field(){
      Ember.$('#mobile').addClass('invalid_input');
      var error = 'Please enter a valid mobile number';
      Ember.$('#mobile_error').text(error);
    }

    function remove_highlight(){
      Ember.$('#mobile').removeClass('invalid_input');
      Ember.$('#mobile_error').empty();
    }
  }

});
