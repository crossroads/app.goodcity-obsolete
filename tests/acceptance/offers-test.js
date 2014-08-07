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
    testHelper = TestHelper.setup(App); // set up helper
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

// -- In Progress --
// test("Creates new project", function() {
//   // create a user in the store
//   var offer = FactoryGuy.build('offer');
//   var item = testHelper.make('item', {offer: offer});
//   offer.items = [item.id]
//   visit('/offers'); // visit the users route

//   andThen(function() {
//     equal($('p.offer_link a').attr('href'), "/offers/new");
//     equal($('ul.offer_list li').length, 1);
//   })
// })
