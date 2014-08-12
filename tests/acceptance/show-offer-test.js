import Ember from 'ember';
import startApp from '../helpers/start-app';
import itemsFactory from '../fixtures/image';
import itemsFactory from '../fixtures/item';
import offersFactory from '../fixtures/offer';

var App, testHelper, store,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Create New Offer', {
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

test("Display offer", function() {
  var image1 = store.makeFixture('image');
  var image2 = store.makeFixture('image', {favourite: 'true'});
  var item   = store.makeFixture('item', {images: [image1.id, image2.id]});

  var item2 = store.makeFixture('item');
  var offer = store.makeFixture('offer', {items: [item.id, item2.id]});

  visit('/offers');
  andThen(function() {

    var link = find("a[href='/offers/"+offer.id+"']");
    click(link[0]);
    andThen(function() {

      // offer show page
      equal(currentURL(), "/offers/"+offer.id);
      equal($.trim($('.item_count').text()), "Offer Items(2)");

      // add-item & remove-item buttons and confirm offer link
      equal($("button.add_item").length, 1);
      equal($("button.removeItem").length, 2);
      equal(find("a[href='/offers/"+offer.id+"/confirm']").length, 1);

      // list of all items (header + 2 items)
      equal($('table tr').length, 3);

      // favourite image for 'item2': default image
      equal($('img[src="assets/images/default_item.jpg"]').length, 1);

      // favourite image for 'item': image2
      equal($("img[src='"+image2.thumbImageUrl+"']").length, 1);
    });
  });
});
