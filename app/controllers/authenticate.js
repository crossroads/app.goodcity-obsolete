import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  needs: ['application'],

  mobile: function() {
    return config.APP.HK_COUNTRY_CODE + this.get('mobilePhone');
  }.property('mobilePhone'),

  actions: {

    authenticateUser: function(){
      Ember.$('.auth_error').hide();
      var pin = this.get('pin');
      var otp_auth_key = this.get('session.otpAuthKey');
      var _this = this;
      var attemptedTransition = _this.get('attemptedTransition');

      Ember.$.ajax({
        type: 'POST',
        url: config.APP.SERVER_PATH +"/auth/verify",
        data: {pin: pin, otp_auth_key: otp_auth_key},
        dataType: 'json',
        success: function(data) {
          Ember.run(function() {
            if(data.error && data.error.length > 0) {
              Ember.$('.auth_error').show();
            }
            else {
              _this.setProperties({pin:null, mobilePhone: null});
              _this.set('session.authToken', data.jwt_token);
              _this.set('session.otpAuthKey', null);

              _this.store.pushPayload(data.user);
              var userId = data.user.user_profile.id;
              var user = _this.store.getById('userProfile', userId);

              Ember.run(function(){
                _this.get('controllers.application').send('logMeIn', userId);
              });

              _this.transitionToRoute('loading');

              var promises = config.APP.PRELOAD_AUTHORIZED_TYPES
                .map(function(type) { return _this.store.find(type); });

              Ember.RSVP.allSettled(promises).finally(function() {
                // After login, redirect user to requested url
                if (attemptedTransition) {
                  attemptedTransition.retry();
                  _this.set('attemptedTransition', null);
                } else {
                  if (user.get('isDonor')) {
                    _this.transitionToRoute('offers');
                  } else {
                    _this.transitionToRoute('inbox');
                  }
                }
              });
            }
            _this.setProperties({mobilePhone:null, pin: null});
          });
        },
        error: function() {
          Ember.run(function() {
            Ember.$('.auth_error').show();
            console.log("Unable to authenticate");
          });
        }
      });
    },
    resendPin: function() {
      var _this = this;
      var mobile = this.get('mobile');
      Ember.$('.loader_image').show();

      Ember.$.ajax({
        type: 'POST',
        url: config.APP.SERVER_PATH + "/auth/send_pin",
        data: {mobile: mobile},
        dataType: 'json',
        success: function(data) {
          Ember.run(function() {
            _this.set('session.otpAuthKey', data.otp_auth_key);
            _this.setProperties({mobilePhone:null, pin:null});
            _this.transitionToRoute('/authenticate');
          });
        },
        complete: function() {
          Ember.run(Ember.$('.loader_image').hide);
        },
        error: function(){
          Ember.run(function() {
            Ember.$('#mobile').addClass('invalid_input');
            Ember.$('#mobile_error').text('Please enter a valid mobile number');
          });
        }
      });
    }
  }

});
