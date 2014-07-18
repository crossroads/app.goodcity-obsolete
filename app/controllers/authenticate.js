import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    authenticate: function(){
      var user_pin = this.get('pin');

      Ember.$.ajax({
        type: 'POST',
        url: GoodcityENV.APP.SERVER_PATH +"/verify",
        data: {pin: user_pin},
        dataType: 'json',
        headers: {
          'Authorization': 'Bearer ' + localStorage.step1_token
        },
        success: function(data){
          delete localStorage.step1_token;
          localStorage.jwt = data.jwt_token;
        },
        failure: function(){
          alert("Unable to authenticate");
        }
      });
    }
  }
});
