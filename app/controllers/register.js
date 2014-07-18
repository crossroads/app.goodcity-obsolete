import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    registerUser: function() {
      var _this = this;
      Ember.$('.loader_image').show();

      var mobilePhone = this.get('mobilePhone');
      var firstName = this.get('firstName');
      var lastName = this.get('lastName');
      var user_auth = { mobile: mobilePhone, first_name: firstName, last_name: lastName};

      Ember.$.ajax({
        type: 'POST',
        url: GoodcityENV.APP.SERVER_PATH +"/signup",
        data: {user_auth: user_auth},
        dataType: 'json',
        success: function(data){
          localStorage.step1_token = data.token;
          _this.transitionToRoute('/authenticate');
        },
        error: function(){
          alert("error");
        }
      }).done(function(){
          Ember.$('.loader_image').hide();
      });

    }
  },

  init: function(){

    Ember.$().ready(function (){
      set_button_visiblity();
      validate_phone();
      Ember.$('#mobile, #first_name, #last_name').keyup(set_button_visiblity);
    });

    function set_button_visiblity(){
      var filled = (Ember.$('#mobile').val().length > 0 &&
        Ember.$('#first_name').val().length > 0 &&
        Ember.$('#last_name').val().length > 0);
      Ember.$("button").prop("disabled", !filled);
    }

    function validate_phone(){
      Ember.$('#mobile').focusout(function(){
        var phone = Ember.$(this).val();
        if(Ember.$.trim(phone).length > 0) {
          if(phone.match(/^\+\d+$/)) {
            check_uniqness(phone);
          } else {
            highlight_phone_field();
          }
        }
      });
    }

    function check_uniqness(phone){
      Ember.$.get(GoodcityENV.APP.SERVER_PATH +"/users/check_mobile", {mobile: phone}).done(function(data){
          var is_uniq = data.is_unique_mobile;
          is_uniq ? remove_highlight() : highlight_phone_field(true);
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
