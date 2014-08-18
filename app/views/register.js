import Ember from 'ember';

export default Ember.View.extend({

  didInsertElement: function(){
    var COUNTRYCODE = "+852";

    Ember.$().ready(function (){
      set_button_visiblity();
      validate_phone();
      Ember.$('#mobile, #first_name, #last_name').keyup(set_button_visiblity);
    });

    function actual_phone_number(phone){
      return (COUNTRYCODE + phone);
    }

    function set_button_visiblity(){
      var filled = (Ember.$('#mobile').val().length > 0 &&
        Ember.$('#first_name').val().length > 0 &&
        Ember.$('#last_name').val().length > 0);
      Ember.$("button").prop("disabled", !filled);
    }

    function validate_phone(){
      Ember.$('#mobile').focusout(function(){
        var phone = Ember.$(this).val();
        if (phone.search(/^\d{8}$/) === 0) {
          check_uniqness(actual_phone_number(phone));
        }else {
          highlight_phone_field();
        }
      });
    }

    function check_uniqness(phone){
      Ember.$.get(GoodcityENV.APP.SERVER_PATH +"/auth/check_mobile",
        {mobile: phone}).done(function(data){
          var is_uniq = data.is_unique_mobile;
          return is_uniq ? remove_highlight() : highlight_phone_field(true);
      });
    }

    function highlight_phone_field(is_duplicate){
      Ember.$('#mobile').addClass('invalid_input');
      var error = is_duplicate ? 'Sorry, this number is already registered!' : 'Please include a valid phone number!';
      Ember.$('#mobile_error').text(error);
    }

    function remove_highlight(){
      Ember.$('#mobile').removeClass('invalid_input');
      Ember.$('#mobile_error').empty();
    }
  }
});
