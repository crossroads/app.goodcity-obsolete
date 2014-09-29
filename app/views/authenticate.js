import Ember from 'ember';

export default Ember.View.extend({

  didInsertElement: function(){

    Ember.$().ready(function (){
      validateForm();
      Ember.$('#pin').focus(function(){ remove_highlight(); });
    });

    function validateForm(){
      Ember.$('#submit_pin').click(function(){
        return isValidPin();
      });

      Ember.$('#pin').focusout(function(){
        return isValidPin();
      });
    }

    function isValidPin(){
      var pin = Ember.$('#pin')[0].value;
        if (pin.search(/^\d{4}$/) === 0) {
          remove_highlight();
          return true;
        } else {
          highlight_pin_field();
          return false;
        }
    }

    function highlight_pin_field(){
      Ember.$('#pin').addClass('invalid_input');
      Ember.$('.auth_error').show();
    }

    function remove_highlight(){
      Ember.$('#pin').removeClass('invalid_input');
      Ember.$('.auth_error').hide();
    }

  }
});
