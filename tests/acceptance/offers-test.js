import Ember from 'ember';
import startApp from '../helpers/start-app';
import offersFactory from '../fixtures/offer';
import itemsFactory from '../fixtures/item';

var App, testHelper, store;

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin,{
  // override setup to do a few extra things for view tests
  setup: function (app, opts) {
    app.reset();  // reset ember app before test
    $.mockjaxSettings.logging = false;   // mockjax settings
    $.mockjaxSettings.responseTime = 0;  // mockjax settings
    return this._super(app); // still call the base setup from FactoryGuyTestMixin
  },
  // override teardown to clear mockjax declarations
  teardown: function() {
    $.mockjaxClear();
    this._super();
  }
});

module('Offer Index View', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    store = testHelper.getStore();
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test('Offers list & link to add items', function() {
  $.mockjax({
    type: 'GET',
    url: "/offers",
    responseText: { offers: FactoryGuy.buildList('offer', 4) }
  });

  visit('/offers');
  andThen(function() {
    equal($('ul.offer_list li').length, 4);

    // test: link to add items to existing offer
    equal($('p.offer_link a').attr('href'), "/offers/1");
  });
});

test("Link to create new offer", function() {
  mockApi(
    'GET',
    "/offers",
    {
      "offers": [ {"id": "1", "state": "draft", "item_ids": ["1"] } ],
      "items":  [ {"id": "1", "offer_id": "1"}]
    });

  visit('/offers');

  andThen(function() {
    equal($('ul.offer_list li').length, 1);
    equal($('p.offer_link a').attr('href'), "/offers/new");
  });
});

test("Offers Details", function() {
  var offer_json = {"id": "1", "state": "draft", "collection_contact_name": 'TestOffer', "item_ids": ["1", "2"] };
  var item1_json = {"id": "1", "offer_id": "1"};
  var item2_json = {"id": "2", "offer_id": "1"};

  mockApi(
    'GET',
    "/offers",
    {
      "offers": [ offer_json ],
      "items":  [ item1_json, item2_json ]
    });

  visit('/offers');

  andThen(function() {
    equal($('ul.offer_list li').length, 1);
    var offer_detail = $('ul.offer_list li').first().text();
    var offer_detail_text = $.trim(offer_detail.replace(/\s+/g, " "));

    // test: offer details
    equal(offer_detail_text, "Offer_id: 1 Name: TestOffer Total items: 2 See more...");

    // test: offer name
    equal(/TestOffer/i.test($('ul.offer_list li').text()), true);

    // test: show offer details link
    equal($('ul.offer_list li').first().find('a').attr('href'), "/offers/1");
  });
});
