import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  actions: {
    registerUser: function() {
      var _this = this;
      Ember.$('.loader_image').show();
      var mobilePhone = Ember.$("#mobile").data("actual-mobile");
      var firstName = this.get('firstName');
      var lastName = this.get('lastName');
      var district_id = Ember.$('.district-selection').attr('selected_id') || null;
      var user_auth = { mobile: mobilePhone, first_name: firstName, last_name: lastName,
        address_attributes: {district_id: district_id, address_type: "profile"}};

      Ember.$.ajax({
        type: 'POST',
        url: config.APP.SERVER_PATH +"/auth/signup",
        data: {user_auth: user_auth},
        dataType: 'json',
        success: function(data){
          Ember.run(function() {
            _this.set('session.otpAuthKey', data.otp_auth_key)
            _this.setProperties({mobilePhone:null, firstName:null, lastName:null});
            _this.transitionToRoute('/authenticate');
          });
        },
        error: function(xhr){
          Ember.run(function() {
            Ember.$('#mobile_error').text(xhr.responseJSON.error.text);
          });
        },
        complete:function(){
          Ember.run(Ember.$('.loader_image').hide);
        }
      });
    }
  }
});
