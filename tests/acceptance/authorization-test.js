import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper, jwt_token,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Authorization', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
  },
  teardown: function() {
    Ember.run(function() {
      testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Rediect to login if not logged-in", function() {
  expect(1);

  delete window.localStorage.authToken;

  visit("/offers");

  andThen(function() {
    equal(currentURL(), '/login');
  });
});

test("Redirect to home-page if already logged-in", function() {
  expect(1);

  visit("/login");

  andThen(function() {
    equal(currentURL(), '/offers');
  });
});

test("Redirect to home-page is already registered", function() {
  expect(1);

  visit("/register");

  andThen(function() {
    equal(currentURL(), '/offers');
  });
});
