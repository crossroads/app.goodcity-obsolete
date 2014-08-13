import Ember from 'ember';
import startApp from '../helpers/start-app';
import offersFactory from '../fixtures/offer';
import itemsFactory from '../fixtures/item';

var App, testHelper, store,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

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
  store.makeList('offer', 4);
  visit('/offers');
  andThen(function() {
    equal($('ul.offer_list li').length, 4);

    // test: link to add items to existing offer
    equal($('p.offer_link a').attr('href'), "/offers/1");
  });
});

test("Link to create new offer", function() {
  var item = store.makeFixture('item');
  var offer = store.makeFixture('offer', {items: [item.id]});
  visit('/offers');

  andThen(function() {
    equal($('ul.offer_list li').length, 1);
    equal($('p.offer_link a').attr('href'), "/offers/new");
  });
});

test("Offers Details", function() {
  var item1 = store.makeFixture('item');
  var item2 = store.makeFixture('item');
  var offer = store.makeFixture('offer', {collectionContactName: 'TestOffer', items: [item1.id, item2.id]});
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
