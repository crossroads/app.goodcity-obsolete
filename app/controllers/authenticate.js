import Ember from 'ember';

export default Ember.Controller.extend({
   needs: ['application'],

   actions: {

    authenticateUser: function(){
      Ember.$('.auth_error').hide();
      var user_pin = this.get('pin');
      var route = this;

      Ember.$.ajax({
        type: 'POST',
        url: GoodcityENV.APP.SERVER_PATH +"/auth/verify",
        data: {pin: user_pin},
        dataType: 'json',
        headers: {
          'Authorization': 'Bearer ' + localStorage.step1_token
        },
        success: function(data){
          if(data.error && data.error.length > 0) {
            Ember.$('.auth_error').show();
          } else {
            delete localStorage.step1_token;
            localStorage.jwt = data.jwt_token;
            route.get('controllers.application').send('logMeIn');
            route.transitionToRoute('offers');
          }
        },
        failure: function(){

        },
        error: function(){
          Ember.$('.auth_error').show();
          alert("Unable to authenticate");
        }
      });
    },
    resendPin: function() {
      var _this = this;
      Ember.$('.loader_image').show();
      var mobile = this.get('mobilePhone');
      Ember.$.ajax({
        type: 'GET',
        url: GoodcityENV.APP.SERVER_PATH +"/auth/resend",
        data: {mobile: mobile},
        dataType: 'json',
        headers: {
          'Authorization': 'Bearer ' + localStorage.step1_token
        },
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
  }

});
