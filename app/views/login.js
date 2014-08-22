import Ember from 'ember';

export default Ember.View.extend({
  isLogin: true,
  didInsertElement: function(){

    Ember.$().ready(function (){
      set_button_visiblity();
      if(Ember.$("#mobile")[0].getAttribute("data-actual-mobile") != null){
        actual_phone_number(this.value);
      }
      validate_phone();
      Ember.$('#mobile, #pin').keyup(set_button_visiblity);
    });

    function actual_phone_number(phone){
      var mobile_with_cc = GoodcityENV.APP.HK_COUNTRY_CODE + phone;
      Ember.$("#mobile")[0].setAttribute("data-actual-mobile", mobile_with_cc);
    }

    function set_button_visiblity(){
      var filled = (Ember.$('#mobile').val().length > 0);
       // && Ember.$('#pin').val().length > 0);
      Ember.$("button#getsmscode").prop("disabled", !filled);
    }

    function validate_phone(){
      Ember.$('#mobile').focusout(function(){
        actual_phone_number(this.value);
        is_phone_valid();
      });
    }

   function is_phone_valid(){
      var phone = Ember.$('#mobile').val();
      if (phone.search(/^\d{8}$/) === 0) {
        remove_highlight();
      }
      else{
        highlight_phone_field();
      }
    }

    // function validate_for_existing_mobile(phone){
    //   Ember.$.get(GoodcityENV.APP.SERVER_PATH +"/auth/verify_mobile", {mobile: phone})
    //     .done(function(data){
    //       var is_existing = data.mobile_exist;
    //       localStorage.step1_token = data.token;
    //       return is_existing ? remove_highlight() : highlight_phone_field(true);
    //     })
    //     .fail(function(res) {
    //       highlight_phone_field(true, res.responseJSON.error.text);
    //   });
    // }

    function highlight_phone_field(not_existing, msg){
      Ember.$('#mobile').addClass('invalid_input');
      var error =  not_existing ? msg : 'Please enter a valid mobile number';
      Ember.$('#mobile_error').text(error);
    }

    function remove_highlight(){
      Ember.$('#mobile').removeClass('invalid_input');
      Ember.$('#mobile_error').empty();
    }
  }

});
