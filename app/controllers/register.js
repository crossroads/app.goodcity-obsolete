import Ember from 'ember';

export default Ember.Controller.extend({

  Selected: Ember.Object.create({
    id: '',
  }),

  actions: {
    registerUser: function() {
      var _this = this;
      Ember.$('.loader_image').show();
      var ele_selected = Ember.$('.district-selection');
      var mobilePhone = this.get('mobilePhone');
      var firstName = this.get('firstName');
      var lastName = this.get('lastName');
      var district_id = ele_selected.attr('selected_id') === undefined ? null : ele_selected.attr('selected_id');
      var user_auth = { mobile: mobilePhone, first_name: firstName, last_name: lastName, district_id: district_id};

      Ember.$.ajax({
        type: 'POST',
        url: GoodcityENV.APP.SERVER_PATH +"/auth/signup",
        data: {user_auth: user_auth},
        dataType: 'json',
        success: function(data){
          localStorage.step1_token = data.token;
          _this.transitionToRoute('/authenticate');
        },
        error: function(xhr){
          Ember.$('#mobile_error').text(xhr.responseJSON.error.text);
        },
        complete:function(){
          Ember.$('.loader_image').hide();
        }
      });
    }
  }
});
