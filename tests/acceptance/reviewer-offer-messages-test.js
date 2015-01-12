import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);
var App, testHelper, offer, reviewer, message1, message2, message3;

module('Reviewer: Display Offer Messages', {
  setup: function() {
    App = startApp({}, 2);
    testHelper = TestHelper.setup(App);

    offer = FactoryGuy.make("offer", { id: 100, state:"under_review"});
    message1 = FactoryGuy.make("message", {id: 101, offer: offer, item: null});
    message2 = FactoryGuy.make("message", {id: 102, offer: offer, item: null, body: "Message from Donor"});
    message3 = FactoryGuy.make("message", {id: 103, offer: offer, item: null, body: "Message from Supervisor", isPrivate: true});
  },

  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("offer-messages from donor", function() {
  visit('/offers/' + offer.id + "/donor_messages");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/donor_messages");
    equal($('.message_details').length, 2);

    var offer_message_thread_text = $('.message_details:last').parent().text();
    equal(offer_message_thread_text.indexOf(message2.get('body')) >= 0, true);
  });
});

test("offer-messages from Supervisor", function() {
  visit('/offers/' + offer.id + "/supervisor_messages");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/supervisor_messages");
    equal($('.message_details').length, 1);

    var offer_message_thread_text = $('.message_details:last').parent().text();
    equal(offer_message_thread_text.indexOf(message3.get('body')) >= 0, true);
  });
});

test("offer-messages from donor should add unread bubble in donor message tab", function() {
  visit('/offers/' + offer.id + "/supervisor_messages");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/supervisor_messages");

    var message4 = FactoryGuy.make("message", {id: 104, offer: offer, item: null, body: "Second Message from Donor"});

    // if message received from donor, add unread bubble mark
    equal($("a[href='/offers/100/donor_messages'] i.unread").length, 1);
  });
});

test("offer-messages from staff should add unread bubble in supervisor message tab", function() {
  visit('/offers/' + offer.id + "/donor_messages");
  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id + "/donor_messages");

    var message5 = FactoryGuy.make("message", {id: 105, offer: offer, item: null, body: "Second Message from Supervisor", isPrivate: true});

    // if message received from donor, add unread bubble mark
    equal($("a[href='/offers/100/supervisor_messages'] i.unread").length, 1);
  });
});
