import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Offers In Review', {
  setup: function() {
    App = startApp({}, 2);
    testHelper = TestHelper.setup(App);
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("redirect to in review offer page", function() {
  visit("/inbox/under_review");

  andThen(function(){
    equal(currentURL(), "/inbox/under_review");
    equal(find("ul.list li").length, 1);
    equal(find("ul.list img").length, 1);
  });
});

test("display submiited offer", function() {
  visit("/inbox/under_review");

  andThen(function(){
    equal(currentURL(), "/inbox/under_review");
    click("ul.list li:first a");
    andThen(function() {
      equal(currentURL(), "/offers/4/review_offer/items");

      var reviewStatus = $.trim($('.review_message').text());
      equal(reviewStatus.indexOf("Started by Jaleel Ondricka") >= 0, true);
    });
  });
});
