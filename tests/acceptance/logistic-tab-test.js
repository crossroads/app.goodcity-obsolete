import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper, offer, item, reviewer,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Review Offer Logistics', {
  setup: function() {
    App = startApp({}, 2);
    testHelper = TestHelper.setup(App);

    reviewer = FactoryGuy.make("user");
    offer = FactoryGuy.make("offer", { id: 100, state: "under_review", reviewedBy:  reviewer });
    item = FactoryGuy.make("item", {id: 100, offer: offer, state: "submitted"});
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("for pending review of items", function() {
  visit("/offers/"+ offer.id +"/review_offer/logistics");

  andThen(function(){
    equal($.trim($('p.no-items').text()), "Please finish reviewing items first!");
  });
});

test("for completed review of items", function() {
  visit("/offers/4/review_offer/logistics");

  andThen(function(){
    equal($.trim($('h3').text()), "Accepted Items (1)");
    equal($(".gogovan-req input[type='radio']").length, 3);
    equal($(".gogovan-req select option").length, 9);
    equal(find("button:contains('Complete Review')").length, 1);
  });
});

test("complete review of offer", function() {
  visit("/offers/4/review_offer/logistics");

  andThen(function(){
    click('#1');
    var crossroadsOption = find('.gogovan-req select option:contains("1/8 Truck")').val();
    find('.gogovan-req select').val(crossroadsOption).change();
    click(find("button:contains('Complete Review')"));

    andThen(function(){
      equal(currentURL(), "/offers/4/review_offer/items");
    });
  });
});
