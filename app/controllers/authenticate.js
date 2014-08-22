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
      console.log('made call to : ' + GoodcityENV.APP.SERVER_PATH +"/auth/verify");
      console.log('localStorage 1: ' + localStorage.step1_token );
      console.log('localStorage 2: ' + localStorage.jwt );
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
          } else {
              localStorage.jwt = data.jwt_token;
              route.get('controllers.application').send('logMeIn');
              // After login, redirect user to requested url
              console.log('attempt: ' + attemptedTransition);
              if (attemptedTransition) {
                attemptedTransition.retry();
                route.set('attemptedTransition', null);
              } else {
                delete localStorage.step1_token;
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

      console.log('made call to : ' + GoodcityENV.APP.SERVER_PATH +"/auth/resend");
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
