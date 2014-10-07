import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
   needs: ['application', 'authorize'],

   actions: {

    authenticateUser: function(){
      Ember.$('.auth_error').hide();
      var user_pin = this.get('pin');
      var route = this;
      var attemptedTransition = route.get('attemptedTransition');
      var token = localStorage.step1_token || this.get('session.authToken');

      Ember.$.ajax({
        type: 'POST',
        url: config.APP.SERVER_PATH +"/auth/verify",
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
            route.set('session.authToken', data.jwt_token);

            Ember.run(function(){
              route.get('controllers.application').send('logMeIn', data.user_id);
            });

            route.store.find('user', data.user_id).then( function(user){
              route.get('controllers.authorize').send('setPermissions', user);

              // After login, redirect user to requested url
              if (attemptedTransition) {
                attemptedTransition.retry();
                route.set('attemptedTransition', null);
              } else {
                if (user.get('isDonor')) {
                  route.transitionToRoute('offers');
                } else {
                  route.transitionToRoute('inbox');
                }
              }
            });

          }
          route.setProperties({mobilePhone:null, pin: null});
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

      var header = {};
      if (localStorage.step1_token) {
        header.Authorization = "Bearer " + localStorage.step1_token;
      }
      else if (this.get('session.authToken')) {
        header.Authorization = "Bearer " + this.get('session.authToken');
      }

      if (this.get('mobilePhone')) {
        mobile = config.APP.HK_COUNTRY_CODE + this.get('mobilePhone');
      }

      Ember.$.ajax({
        type: 'GET',
        url: config.APP.SERVER_PATH +"/auth/resend",
        data: {mobile: mobile},
        dataType: 'json',
        headers: header,
        success: function(data){
          localStorage.step1_token = data.token;
          _this.setProperties({mobilePhone:null, pin:null});
          _this.transitionToRoute('/authenticate');
        },
        error: function(){
          Ember.$('#mobile').addClass('invalid_input');
          Ember.$('#mobile_error').text('Please enter a valid mobile number');
        }
      }).done(function(){
          Ember.$('.loader_image').hide();
      });
    }
  }

});
