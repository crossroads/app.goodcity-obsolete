import Ember from 'ember';

export default Ember.View.extend({

  didInsertElement: function(){

    Ember.$().ready(function (){
      validate_pin();
      Ember.$('#pin').focus(function(){ remove_highlight(); });
    });

    function validate_pin(){
      Ember.$('#pin').focusout(function(){
        var pin = Ember.$('#pin')[0].value;
        if (pin.search(/^\d{4}$/) === 0) {
          remove_highlight();
        } else {
          highlight_pin_field();
        }
      });
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
