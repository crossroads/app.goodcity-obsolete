import Ember from 'ember';

export default Ember.View.extend({

  didInsertElement: function(){

    Ember.$().ready(function (){
      set_button_visiblity();
      validate_pin();
      Ember.$('#pin').focusout(set_button_visiblity);
    });

    function set_button_visiblity(){
      var filled = Ember.$('#pin').length > 0 && Ember.$('#pin').val().length >0;
      Ember.$("button#submit_pin").prop("disabled", !filled);
    }

    function validate_pin(){
      Ember.$('#pin').focusout(function(){
        var pin =  Ember.$('#pin')[0].value;
        if (pin.search(/^\d{4}$/) === 0) {
          Ember.$('.auth_error').css("display","none");
        }
        else
        {
          Ember.$('.auth_error').text("Please enter valid pin").css("display","block");
        }
      });
    }
  }
});
