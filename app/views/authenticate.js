import Ember from 'ember';

export default Ember.View.extend({

  didInsertElement: function(){

    Ember.$().ready(function (){
      validateForm();
    });

    function validateForm(){
      Ember.$('#submit_pin').click(function(){ return isValidPin(); });
      Ember.$('#pin').focus(function(){ remove_highlight(); });
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
      Ember.$('#pin').closest('div').addClass('error');
    }

    function remove_highlight(){
      Ember.$('#pin').closest('div').removeClass('error');
    }

  }
});
