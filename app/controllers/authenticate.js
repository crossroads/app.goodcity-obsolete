import Ember from 'ember';

export default Ember.Controller.extend({
   needs: ['application'],

   actions: {

    authenticateUser: function(){
      Ember.$('.auth_error').hide();
      var user_pin = this.get('pin');
      var route = this;
      var attemptedTransition = route.get('attemptedTransition');
      var token = localStorage.step1_token === undefined  ? localStorage.jwt : localStorage.step1_token;

      Ember.$.ajax({
        type: 'POST',
        url: GoodcityENV.APP.SERVER_PATH +"/auth/verify",
        data: {pin: user_pin},
        dataType: 'json',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        success: function(data){
          if(data.error && data.error.length > 0) {
            Ember.$('.auth_error').show();
          }
          else {
            delete localStorage.step1_token;
            localStorage.jwt = data.jwt_token;
            Ember.run(function(){
              route.get('controllers.application').send('logMeIn');
            });
            window.Goodcity.set('authToken', localStorage.jwt);
            // After login, redirect user to requested url
            if (attemptedTransition) {
              attemptedTransition.retry();
              route.set('attemptedTransition', null);
            } else {
              // Redirect to 'articles' by default.
              route.transitionToRoute('offers');
            }
          }
        },
        failure: function(){
          console.log('Fail token: ' + token);
        },
        error: function(){
          Ember.$('.auth_error').show();
          console.log("Unable to authenticate");
        }
      });
    },
    resendPin: function() {
      var _this = this;
      var mobile = "";
      Ember.$('.loader_image').show();
      var token = localStorage.step1_token === undefined  ? localStorage.jwt : localStorage.step1_token;
      if (this.get('mobilePhone') !== "undefinded") {
        mobile = GoodcityENV.APP.HK_COUNTRY_CODE + this.get('mobilePhone');
      }

      Ember.$.ajax({
        type: 'GET',
        url: GoodcityENV.APP.SERVER_PATH +"/auth/resend",
        data: {mobile: mobile},
        dataType: 'json',
        headers: {
          'Authorization': 'Bearer ' + token
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
