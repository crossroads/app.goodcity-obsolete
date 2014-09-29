import Ember from 'ember';

export default Ember.View.extend({

  didInsertElement: function(){
    Ember.$().ready(function (){
      validate_fields();
      verifyFormInput();
    });

    function actual_phone_number(phone){
      var mobile_with_cc = GoodcityENV.APP.HK_COUNTRY_CODE + phone;
      Ember.$("#mobile")[0].setAttribute("data-actual-mobile", mobile_with_cc);
    }

    function verifyFormInput(){
      Ember.$("#registerUser").click(function(){

        var formInputs = ['mobile', 'first_name', 'last_name'];
        Ember.$.each(formInputs, function(index, value) {
          if(Ember.$('#' + value).val().length < 1) {
            Ember.$('#' + value).addClass('invalid_input');
          }
        });

        if(!Ember.$('.district-selection').attr('selected_id')) {
          Ember.$('.ember-select').addClass('invalid_input');
        }

        if(Ember.$('.invalid_input').length > 0) {
          return false;
        }
      });
    }

    function validate_fields(){
      Ember.$('#mobile').focusout(function(){
        var phone = Ember.$(this).val();
        if (phone.search(/^\d{8}$/) === 0) {
          actual_phone_number(phone);
          check_uniqness(this.getAttribute("data-actual-mobile"));
        }else {
          highlight_phone_field();
        }
      });

      Ember.$('#mobile, #first_name, #last_name, .ember-select').focus(function(){
        remove_highlight(this);
      });
    }

    function check_uniqness(phone){
      Ember.$.getJSON(GoodcityENV.APP.SERVER_PATH +"/auth/check_mobile",
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

    function remove_highlight(input){
      Ember.$(input).removeClass('invalid_input');
      Ember.$('#mobile_error').empty();
    }
  }
});
