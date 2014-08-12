import Ember from 'ember';
import startApp from '../helpers/start-app';
import itemsFactory from '../fixtures/image';
import itemsFactory from '../fixtures/item';
import offersFactory from '../fixtures/offer';

var App, testHelper, store, image1, image2, item, offer,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Create New Offer', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    store = testHelper.getStore();

    image1 = store.makeFixture('image');
    image2 = store.makeFixture('image');
    item   = store.makeFixture('item', {images: [image1.id, image2.id]});
    offer  = store.makeFixture('offer', {items: [item.id]});

  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Display Item", function() {
  visit("/offers/"+offer.id+"/items/"+item.id);
  andThen(function(){

    equal(currentURL(), "/offers/"+offer.id+"/items/"+item.id);
    equal(/Description: example1/i.test($('body').text()), true);

    // item images count
    equal($("img").length, 2);
  });
});

test("back button redirects to its offer", function() {
  visit("/offers/"+offer.id+"/items/"+item.id);
  andThen(function(){
    click(find('button.backButton')[0]);
    andThen(function() {
      equal(currentURL(), "/offers/"+offer.id);
    });
  });
});
