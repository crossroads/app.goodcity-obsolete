import Ember from 'ember';
import startApp from '../helpers/start-app';
import userFactory from '../fixtures/user';
import territoryFactory from '../fixtures/territory';
import districtFactory from '../fixtures/district';

var App,
    testHelper,
    hk_user,
    non_hk_user,
    territory,
    district;

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Acceptance: Register', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    logoutUser('/register');
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

test("All required registration details are filled", function() {
  expect(6);
  visit('/register');
  fillIn('input#mobile', hk_user.mobile);
  fillIn('input#first_name',  hk_user.firstName );
  fillIn('input#last_name', hk_user.lastName);

  andThen(function() {
    click(find("li.territory_menu#all")[0]);
  });
  andThen(function() {
    click($('select.ember-select>option:contains("Tung Chung")').prop('selected', 'selected'));
  });
  andThen(function() {
    equal($('select.ember-select').find(":selected").text(), "Tung Chung");
  });
  andThen(function() {
    equal(find('input#mobile')[0].value, hk_user.mobile);
    equal(find('input#first_name')[0].value, hk_user.firstName);
    equal(find('input#last_name')[0].value, hk_user.lastName);
    equal($('select.ember-select').find(":selected").text(), "Tung Chung");
    click($("button:contains('Register')")[0]);
    andThen(function(){
      equal(currentURL(), "/authenticate");
    });
  });

});

test("cannot register unless mobile number details are entered", function() {
  expect(1);
  visit('/register');
  fillIn("input#first_name",  hk_user.firstName );
  fillIn('input#last_name', hk_user.lastName);
  andThen(function() {
    equal($('span:contains("Register")').closest('button').attr("disabled"), "disabled");
    // equal("", "");
  });
});

test("should prepend country code +852 internally for api call", function() {
  expect(2);
  visit('/register');
  andThen(function() {
    fillIn('input#mobile', hk_user.mobile);
    find('input#mobile').blur();
  });
  andThen(function() {
    equal(find('input#mobile')[0].value, hk_user.mobile);
    equal($('#mobile_error').text(), "");
  });
});

test("mobile number length should be 8 digit (excluding country code)", function() {
  expect(1);
  visit('/register');
  fillIn('input#mobile', hk_user.mobile);
  fillIn("input#first_name",  hk_user.firstName );
  fillIn('input#last_name', hk_user.lastName);
  andThen(function() {
    equal(find('input#mobile')[0].value.length, 8);
  });
});
