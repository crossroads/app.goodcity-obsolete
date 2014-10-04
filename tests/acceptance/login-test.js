import Ember from 'ember';
import startApp from '../helpers/start-app';
import userFactory from '../fixtures/user';

var App, testHelper, hk_user, non_hk_user;

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Acceptance: Login', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);

    hk_user = FactoryGuy.build('with_hk_mobile');
    non_hk_user = FactoryGuy.build('with_non_hk_mobile');
  },
  teardown: function() {
    Ember.run(function () {
      testHelper.teardown();
    });
    Ember.run(App, 'destroy');
  }
});

test("User able to enter mobile number and get the sms code", function() {
  logoutUser('/login');
  expect(1);
  visit('/login');
  fillIn('input#mobile', hk_user.mobile);
  triggerEvent('input#mobile', 'blur');
  click($("#getsmscode")[0]);
  andThen(function(){
    equal(currentURL(), "/authenticate");
  });
});

test("User is able to enter sms code and confirm and redirected to offers", function(){
  var authToken = window.localStorage.authToken;
  logoutUser('/authenticate');
  expect(2);

  visit('/authenticate');
  fillIn('input#pin', "12345");
  triggerEvent('input#pin', 'blur');
  andThen(function() {
    window.localStorage.authToken = authToken;
    equal(find('input#pin').val().length, 6);
  });
  andThen(function(){
    click($("#submit_pin")[0]);
  });
  andThen(function(){
    equal(currentURL(), "/offers");
  });
});

test("User is able to resend the sms code", function(){

});
