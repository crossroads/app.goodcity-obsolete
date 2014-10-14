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

test("On login page redirect to home-page if already logged-in", function() {
  expect(1);

  visit("/login");

  andThen(function() {
    equal(currentURL(), '/offers');
  });
});

test("On register page redirect to home-page if already logged-in", function() {
  expect(1);

  visit("/register");

  andThen(function() {
    equal(currentURL(), '/offers');
  });
});

test("On restricted page redirect to offers page if not staff", function() {
  expect(2);

  visit('/');

  andThen(function() {
    equal(currentURL(), '/');
  });

  visit('/inbox');

  andThen(function() {
    equal(currentURL(), '/offers');
  });
});

test("On restricted page doesn't redirect if staff", function() {
  expect(2);

  window.localStorage.permissions = '{"isDonor":false,"isReviewer":false,"isSupervisor":true}';
  visit('/');

  andThen(function() {
    equal(currentURL(), '/');
  });

  visit('/inbox');

  andThen(function() {
    equal(currentURL(), '/inbox');
  });
});
