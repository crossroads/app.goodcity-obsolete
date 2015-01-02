import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuy.testMixin);
var App, testHelper, store, offer1, offer2, reviewer, reviewerName,
  offer3, offer4, delivery1, delivery2, offer5, delivery3, offer6;

module('Display Offer Status', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    store = testHelper.getStore();
    syncDataStub(testHelper);

    reviewer = store.makeFixture("user");
    offer1 = store.makeFixture("offer", {state:"submitted"});
    offer2 = store.makeFixture("offer", {state:"under_review", reviewedBy: reviewer});
    reviewerName = reviewer.get("firstName");
    offer3 = store.makeFixture("offer", {state:"reviewed"});

    delivery1 = store.makeFixture('delivery', {deliveryType: "Alternate"});
    offer4 = store.makeFixture("offer", {state:"scheduled", delivery: delivery1});

    delivery2 = store.makeFixture('delivery', {deliveryType: "Gogovan"});
    offer5 = store.makeFixture("offer", {state:"scheduled", delivery: delivery2});

    delivery3 = store.makeFixture('delivery', {deliveryType: "Drop Off"});
    offer6 = store.makeFixture("offer", {state:"scheduled", delivery: delivery3});
  },

  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Display offer status for submitted offer", function() {
  visit('/offers/' + offer1.id + "/offer_details");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer1.id + "/offer_details");
    equal($.trim(find('.status-message').text()), "Your offer is awaiting review.");
  });
});

test("Display offer status for offer under review", function() {
  visit('/offers/' + offer2.id + "/offer_details");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer2.id + "/offer_details");
    equal($.trim(find('.status-message').text()), "Your offer is being reviewed by "+ reviewerName +".");
  });
});

test("Display offer status for reviewed offer", function() {
  visit('/offers/' + offer3.id + "/offer_details");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer3.id + "/offer_details");
    equal($.trim(find('.status-message').text()), "Review complete! Please arrange transport.");
  });
});

test("Display offer status for scheduled offer: Collection", function() {
  visit('/offers/' + offer4.id + "/offer_details");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer4.id + "/offer_details");
    equal($.trim(find('.status-message').text().replace(/\s{2,}/g, ' ')), "Collection Mon 1st , Afternoon");
  });
});

test("Display offer status for scheduled offer: Gogovan", function() {
  visit('/offers/' + offer5.id + "/offer_details");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer5.id + "/offer_details");
    equal($.trim(find('.status-message').text().replace(/\s{2,}/g, ' ')), "Van Booked Afternoon, 2pm-4pm, Mon 1st");
  });
});

test("Display offer status for scheduled offer: Drop Off", function() {
  visit('/offers/' + offer6.id + "/offer_details");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer6.id + "/offer_details");
    equal($.trim(find('.status-message').text().replace(/\s{2,}/g, ' ')), "Drop-off Mon 1st , Afternoon");
  });
});
