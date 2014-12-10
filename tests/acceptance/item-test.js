import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuy.testMixin);
var App, testHelper, store, offer, item, display_item_url;

module('Display Item', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    store = testHelper.getStore();
    syncDataStub(testHelper);

    offer = store.makeFixture("offer");
    item = store.makeFixture("item",{offer:offer});
    store.makeList("image", 2, {item:item});
    display_item_url = "/offers/" + offer.id + "/items/" + item.id;
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Display Item Details", function() {
  expect(3);

  visit(display_item_url);

  andThen(function(){
    equal(currentURL(), display_item_url);
    equal(/Description: example1/i.test($('body').text()), true);

    // item images count
    equal(find("img").length, 2);
  });
});

test("Back button redirects to its offer", function() {
  expect(1);

  visit(display_item_url);
  click('button.backButton');

  andThen(function() {
    equal(currentURL(), "/offers/" + offer.id);
  });
});
