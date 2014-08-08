import Ember from 'ember';
import startApp from '../helpers/start-app';
import offersFactory from '../fixtures/offer';
import itemsFactory from '../fixtures/item';

var App,
  testHelper,
  store,
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

test('Index: Offers List', function() {
  store.makeList('offer', 4);
  visit('/offers');
  andThen(function() {
    equal($('p.offer_link a').attr('href'), "/offers/1");
    equal($('ul.offer_list li').length, 4);
  });
});

test("Index: Link to create new offer", function() {
  var item = store.makeFixture('item');
  var offer = store.makeFixture('offer', {collectionContactName: 'TestOffer', items: [item.id]});
  visit('/offers');

  andThen(function() {
    equal($('p.offer_link a').attr('href'), "/offers/new");
    equal($('ul.offer_list li').length, 1);
    equal(/TestOffer/i.test($('ul.offer_list li').text()), true);
  });
});
