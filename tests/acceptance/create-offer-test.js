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

    item = store.makeFixture('item');
    offer = store.makeFixture('offer', {state: 'submit', items: [item.id]});

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
      equal(currentURL().split('-')[0], '/offers/fixture');

      //test: item count zero
      equal($.trim($('.itemCount').text()), "Offer items (0)");

      //test: no items message
      equal($.trim($('.noItemMsg').text()), "You don't have any items in this offer yet. Please add your first item!");
    });
  });
});
