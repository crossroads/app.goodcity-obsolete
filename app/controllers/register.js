import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    registerUser: function() {
      var _this = this;
      Ember.$('.loader_image').show();

      var mobilePhone = this.get('mobilePhone');
      var firstName = this.get('firstName');
      var lastName = this.get('lastName');
      var user_auth = { mobile: mobilePhone, first_name: firstName, last_name: lastName};

      Ember.$.ajax({
        type: 'POST',
        url: GoodcityENV.APP.SERVER_PATH +"/signup",
        data: {user_auth: user_auth},
        dataType: 'json',
        success: function(data){
          localStorage.step1_token = data.token;
          _this.transitionToRoute('/authenticate');
        },
        error: function(xhr){
          Ember.$('#mobile_error').text(xhr.responseJSON.msg);
        },
        complete:function(){
          Ember.$('.loader_image').hide();
        }
      });
    }
  }
});
