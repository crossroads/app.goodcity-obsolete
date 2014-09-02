import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper, jwt_token,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Authorization', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    window.alert = function() { return true; };
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Rediect to login if not logged-in", function() {
  jwt_token = window.localStorage.jwt;
  delete window.localStorage.jwt;

  visit("/offers");
  andThen(function() {
    equal(currentURL(), '/login');
  });

  window.localStorage.jwt = jwt_token;
});

test("Redirect to home-page if already logged-in", function() {
  visit("/login");
  andThen(function() {
    equal(currentURL(), '/offers');
  });
});

test("Redirect to home-page is already registered", function() {
  visit("/register");
  andThen(function() {
    equal(currentURL(), '/offers');
  });
});