import Ember from 'ember';

export default Ember.View.extend({
  isLogin: true,
  didInsertElement: function(){

    Ember.$().ready(function (){
      set_button_visiblity();
      validate_phone();
      Ember.$('#mobile, #pin').keyup(set_button_visiblity);
      Ember.$('#resend-pin').on('click', function(){
        is_phone_valid();
      });
    });

    function set_button_visiblity(){
      var filled = (Ember.$('#mobile').val().length > 0 &&
        Ember.$('#pin').val().length > 0);
      Ember.$("button#submit_pin").prop("disabled", !filled);
    }

    function validate_phone(){
      Ember.$('#mobile').focusout(function(){
        is_phone_valid();
      });
    }

   function is_phone_valid(){
      var phone = Ember.$('#mobile').val();
      if((Ember.$.trim(phone).length > 0) && (phone.match(/^\+\d+$/))){
        remove_highlight();
        validate_for_existing_mobile(phone);
      }
      else
      {
        highlight_phone_field();
      }
    }

    function validate_for_existing_mobile(phone){
      Ember.$.get(GoodcityENV.APP.SERVER_PATH +"/auth/verify_mobile", {mobile: phone}).done(function(data){
          var is_existing = data.mobile_exist;
          localStorage.step1_token = data.token;
          return is_existing ? remove_highlight() : highlight_phone_field(true);
      });
    }

    function highlight_phone_field(not_existing){
      Ember.$('#mobile').addClass('invalid_input');
      var error =  not_existing ? 'Sorry, this number is not registered!' : 'Please enter a valid mobile number';
      Ember.$('#mobile_error').text(error);
    }

    function remove_highlight(){
      Ember.$('#mobile').removeClass('invalid_input');
      Ember.$('#mobile_error').empty();
    }
  }

});
