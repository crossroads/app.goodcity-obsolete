import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper,
  TestHelper = Ember.Object.createWithMixins(FactoryGuy.testMixin);

module('Review Offer Logistics', {
  setup: function() {
    App = startApp({}, 2);
    testHelper = TestHelper.setup(App);
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("for pending review of items", function() {
  visit("/offers/3/review_offer/logistics");

  andThen(function(){
    equal($.trim($('p.no-items').text()), "Please finish reviewing items first!");
  });
});

test("for completed review of items", function() {
  visit("/offers/4/review_offer/logistics");

  andThen(function(){
    equal($.trim($('h3').text()), "Accepted Items (1)");
    equal($(".gogovan-req input[type='radio']").length, 3);
    equal($(".gogovan-req select option").length, 8);
    equal(find("a:contains('Complete Review')").length, 1);
  });
});

test("complete review of offer", function() {
  visit("/offers/4/review_offer/logistics");

  andThen(function(){
    click('#1');
    var crossroadsOption = find('.gogovan-req select option:contains("1/8 Truck")').val();
    find('.gogovan-req select').val(crossroadsOption).change();
    click(find("a:contains('Complete Review')"));

    andThen(function(){
      equal(currentURL(), "/offers/4/review_offer/items");
    });
  });
});
