import Ember from 'ember';
import AjaxPromise from '../utils/ajax-promise';
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

      new AjaxPromise("/auth/verify", "POST", null, {pin: pin, otp_auth_key: otp_auth_key})
        .then(function(data) {
          if (data.error && data.error.length > 0) {
            Ember.$('.auth_error').show();
          }
          else {
            _this.setProperties({pin:null, mobilePhone: null});
            _this.set('session.authToken', data.jwt_token);
            _this.set('session.otpAuthKey', null);
            _this.store.pushPayload(data.user);

            Ember.run(function(){
              _this.get('controllers.application').send('logMeIn');
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
                if (_this.session.get('currentUser.isDonor')) {
                  _this.transitionToRoute('offers');
                } else {
                  _this.transitionToRoute('inbox');
                }
              }
            });
          }
          _this.setProperties({mobilePhone:null, pin: null});
        })
        .catch(function() {
          Ember.$('.auth_error').show();
          console.log("Unable to authenticate");
        });
    },

    resendPin: function() {
      var _this = this;
      var mobile = this.get('mobile');
      var loadingView = this.container.lookup('view:loading').append();

      new AjaxPromise("/auth/send_pin", "POST", null, {mobile: mobile})
        .then(function(data) {
          _this.set('session.otpAuthKey', data.otp_auth_key);
          _this.setProperties({mobilePhone:null, pin:null});
          _this.transitionToRoute('/authenticate');
        })
        .catch(function() {
          Ember.$('#mobile').closest('.mobile').addClass('error');
        })
        .finally(function() {
          loadingView.destroy();
        });
    }
  }

});
