import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuy.testMixin);
var App, testHelper, store, offer, reviewer, item1, item2, item3,
  message1, message2;

module('Display Offer Details', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    store = testHelper.getStore();
    syncDataStub(testHelper);

    reviewer = store.makeFixture("user");
    offer = store.makeFixture("offer", {state:"under_review", reviewedBy: reviewer});
    item1 = store.makeFixture("item", {state:"accepted", offer: offer});
    item2 = store.makeFixture("item", {state:"rejected", offer: offer});
    item3 = store.makeFixture("item", {state:"submitted", offer: offer});
    message1 = store.makeFixture("message", {sender: reviewer, offer: offer, item: null});
    message2 = store.makeFixture("message", {sender: reviewer, offer: offer, item: item3});
  },

  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("item status badge on item-image", function() {
  visit('/offers/' + offer.id + "/offer_details");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/offer_details");

    // display 'Accepted' status for accepted-item
    equal($(".item-image .accept_badge").length, 1);

    // display 'Rejected' status for accepted-item
    equal($(".item-image .reject_badge").length, 1);
  });
});

test("offer-messages thread details", function() {
  visit('/offers/' + offer.id + "/offer_details");
  andThen(function() {
    // display 'General Messages' thread
    equal($('div:contains("General Messages"):last').length, 1);

    var offer_message_tread_text = $('div:contains("General Messages"):last').closest('span.info').text();

    // display latest offer message in 'General Messages' thread
    equal(offer_message_tread_text.indexOf(message1.get('body')) > 0, true);

    // display unread offer message count in 'General Messages' thread
    equal(offer_message_tread_text.indexOf('1') > 0, true);
  });
});

test("ordering of message threads", function() {
  visit('/offers/' + offer.id + "/offer_details");
  andThen(function() {
    // latest item message thread
    var latest_message_thread = $('.list li:eq(0)').text();
    equal(latest_message_thread.indexOf(item3.get('donorDescription')) > 0, true);

    // second offer message thread
    var offer_message_thread = $('.list li:eq(1)').text();
    equal(offer_message_thread.indexOf("General Messages") > 0, true);
  });
});
