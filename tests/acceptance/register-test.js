import Ember from 'ember';
import startApp from '../helpers/start-app';
import userFactory from '../fixtures/user';
import territoryFactory from '../fixtures/territory';
import districtFactory from '../fixtures/district';

var App,
    testHelper,
    hk_user,
    territory,
    district;

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Acceptance: Register', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    delete window.localStorage.authToken;
    hk_user = FactoryGuy.build('with_hk_mobile');
  },
  teardown: function() {
    Ember.run(function () {
      testHelper.teardown();
    });
    Ember.run(App, 'destroy');
  }
});

test("All required registration details are filled", function() {
  expect(6);

  visit('/register');
  fillIn('#mobile', hk_user.mobile);
  triggerEvent('#mobile', 'blur');
  fillIn('#first_name',  hk_user.firstName );
  fillIn('#last_name', hk_user.lastName);
  click("#all");
  click(find('select.ember-select>option:contains("Tung Chung")'));

  andThen(function() {
    equal(find('select.ember-select').find(":selected").text(), "Tung Chung");
    equal(find('#mobile').val(), hk_user.mobile);
  });

  triggerEvent('#mobile', 'blur');

  andThen(function() {
    equal(find('#first_name').val(), hk_user.firstName);
    equal(find('#last_name').val(), hk_user.lastName);
    equal(find('select.ember-select').find(":selected").text(), "Tung Chung");
  });

  click("button:contains('Register')");

  andThen(function(){
    equal(currentURL(), "/authenticate");
  });
});

test("cannot register unless mobile number details are entered", function() {
  expect(1);
  visit('/register');
  fillIn("#first_name",  hk_user.firstName );
  fillIn('#last_name', hk_user.lastName);
  andThen(function() {
    equal(currentURL(), '/register');
  });
});

test("should prepend country code +852 internally for api call", function() {
  expect(3);
  visit('/register');
  fillIn('#mobile', hk_user.mobile);
  triggerEvent('#mobile', 'blur');
  andThen(function() {
    equal(find('#mobile').val(), hk_user.mobile);
    equal(find('#mobile').attr("data-actual-mobile").substr(0,4), '+852');
    equal(find('#mobile_error').text(), "");
  });
});

test("mobile number length should be 8 digit (excluding country code)", function() {
  expect(1);
  visit('/register');
  fillIn('#mobile', hk_user.mobile);
  triggerEvent('#mobile', 'blur');
  fillIn("#first_name",  hk_user.firstName );
  fillIn('#last_name', hk_user.lastName);
  andThen(function() {
    equal(find('#mobile').val().length, 8);
  });
});
