import Ember from 'ember';
import startApp from '../helpers/start-app';
import offersFactory from '../fixtures/offer';
import itemsFactory from '../fixtures/item';

var App, testHelper, store, item, offer,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Create New Offer', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    store = testHelper.getStore();

    var offer_json = {"id": "1", "state": "draft", "collection_contact_name": 'TestOffer', "item_ids": ["1", "2"] };
    var item1_json = {"id": "1", "offer_id": "1"};
    var item2_json = {"id": "2", "offer_id": "1"};

    var offer2_json = {"id": "2", "state": "draft", "collection_contact_name": 'TestOffer' };

    mockApi(
      'GET',
      "/offers",
      {
        "offers": [ offer_json ],
        "items":  [ item1_json, item2_json ]
      });

    mockApi(
      'POST',
      "/offers",
      {
        "offer": [ offer2_json ],
        "items":  [ ]
      });
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Make New Donation link-click should create new offer", function() {
  visit('/offers');

  andThen(function() {
    equal($('p.offer_link a').attr('href'), "/offers/new");

    var link = find('a[href="/offers/new"]');
    click(link[0]);
    andThen(function() {
      // test: created new offer and redirected to its show page.
      equal(currentURL(), '/offers/2');

      //test: item count zero
      equal($.trim($('.itemCount').text()), "Offer items (0)");

      //test: no items message
      equal($.trim($('.noItemMsg').text()), "You don't have any items in this offer yet. Please add your first item!");
    });
  });
});
