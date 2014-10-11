import Ember from 'ember';
import config from '../config/environment';

export default Ember.View.extend({

  didInsertElement: function(){
    Ember.$().ready(function (){
      validate_fields();
      verifyFormInput();
    });

    function actual_phone_number(phone){
      var mobile_with_cc = config.APP.HK_COUNTRY_CODE + phone;
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
          // should also start with 5, 6 or 9
          actual_phone_number(phone);
        }else {
          highlight_phone_field();
        }
      });

      Ember.$('#mobile, #first_name, #last_name, .ember-select').focus(function(){
        remove_highlight(this);
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
