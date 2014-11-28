import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper,
  TestHelper = Ember.Object.createWithMixins(FactoryGuy.testMixin);

module('Display Item', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Display Item Details", function() {
  expect(3);

  visit("/offers/1/items/1");

  andThen(function(){
    equal(currentURL(), "/offers/1/items/1");
    equal(/Description: example1/i.test($('body').text()), true);

    // item images count
    equal(find("img").length, 2);
  });
});

test("Back button redirects to its offer", function() {
  expect(1);

  visit("/offers/1/items/1");
  click('button.backButton');

  andThen(function() {
    equal(currentURL(), "/offers/1");
  });
});
