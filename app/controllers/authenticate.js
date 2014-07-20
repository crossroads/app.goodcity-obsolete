import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {

    authenticateUser: function(){
      Ember.$('.auth_error').hide();
      var user_pin = this.get('pin');
      var route = this;

      Ember.$.ajax({
        type: 'POST',
        url: GoodcityENV.APP.SERVER_PATH +"/verify",
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
            route.transitionToRoute('offers');
          }
        },
        failure: function(){
          Ember.$('.auth_error').show();
          alert("Unable to authenticate");
        }
      });
    }
  }

});
