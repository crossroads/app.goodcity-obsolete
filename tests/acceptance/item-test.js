import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

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
  visit("/offers/1/items/1");
  andThen(function(){

    equal(currentURL(), "/offers/1/items/1");
    equal(/Description: example1/i.test($('body').text()), true);

    // item images count
    equal($("img").length, 2);
  });
});

test("Back button redirects to its offer", function() {
  visit("/offers/1/items/1");
  andThen(function(){
    click(find('button.backButton')[0]);
    andThen(function() {
      equal(currentURL(), "/offers/1");
    });
  });
});
