import Ember from 'ember';
import startApp from '../helpers/start-app';
import offersFactory from '../fixtures/offer';
import itemsFactory from '../fixtures/item';

var App, testHelper, store,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('User View', {
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

test("Index: Make New Donation link-click should create new offer", function() {
  var item = store.makeFixture('item');
  var offer = store.makeFixture('offer', {state: 'submit', items: [item.id]});
  visit('/offers');

  andThen(function() {
    equal($('p.offer_link a').attr('href'), "/offers/new");

    var link = find('a[href="/offers/new"]');
    click(link[0]);
    andThen(function() {
      // test: created new offer and redirected to its show page.
      equal(currentURL(), '/offers/fixture-0');

      //test: item count zero
      equal($.trim($('.item_count').text()), "Offer Items(0)");

      //test: no items message
      equal($.trim($('.no_item_msg').text()), "You don't have any items in this offer yet. Please add your first item!");
    });
  });
});
