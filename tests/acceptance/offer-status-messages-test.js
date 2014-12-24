import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuy.testMixin);
var App, testHelper, store, offer1, offer2, reviewer, reviewerName,
  offer3, offer4;

module('Display Offer Status', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    store = testHelper.getStore();
    syncDataStub(testHelper);

    reviewer = store.makeFixture("user");
    offer1 = store.makeFixture("offer", {state:"submitted"});
    offer2 = store.makeFixture("offer", {state:"under_review", reviewedBy: reviewer});
    reviewerName = reviewer.get("firstName") + " " + reviewer.get("lastName");
    offer3 = store.makeFixture("offer", {state:"reviewed"});
    offer4 = store.makeFixture("offer", {state:"scheduled"});
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

test("Display offer status for submitted offer", function() {
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

test("Display offer status for reviewed offer", function() {
  visit('/offers/' + offer4.id + "/offer_details");

  andThen(function() {
    equal(currentURL(), "/offers/" + offer4.id + "/offer_details");
    equal($.trim(find('.status-message').text()), "Collection booked  Mon 1st, Afternoon");
  });
});
