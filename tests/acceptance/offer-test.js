import Ember from 'ember';
import startApp from '../helpers/start-app';
import itemsFactory from '../fixtures/image';
import itemsFactory from '../fixtures/item';
import offersFactory from '../fixtures/offer';

var App, testHelper, store, image1, image2, item, item2 , offer,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Display Offer', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    store = testHelper.getStore();

    image1 = store.makeFixture('image');
    image2 = store.makeFixture('image', {favourite: 'true'});
    item   = store.makeFixture('item', {images: [image1.id, image2.id]});

    item2  = store.makeFixture('item');
    offer  = store.makeFixture('offer', {items: [item.id, item2.id]});

  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Display offer details", function() {
  visit('/offers');
  andThen(function() {

    var link = find("a[href='/offers/"+offer.id+"']");
    click(link[0]);
    andThen(function() {

      // offer show page
      equal(currentURL(), "/offers/"+offer.id);
      equal($.trim($('.itemCount').text()), "Offer items (2)");

      // add-item & remove-item buttons and confirm offer link
      equal($("button.addItem").length, 1);
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

test("Cancel Offer", function() {
  visit("/offers/"+offer.id);
  andThen(function() {

    click($("button:contains('Cancel Offer')")[0]);
    andThen(function() {
      equal(currentURL(), "/offers");
    });
  });
});

test("Remove Item", function() {
  visit("/offers/"+offer.id);
  andThen(function() {
    // list of all items (header + 2 items)
    equal($('table tr').length, 3);

    click($("button.removeItem")[0]);
    andThen(function() {
      equal($('table tr').length, 2);
      equal($.trim($('.itemCount').text()), "Offer items (1)");
    });
  });
});

test("Confirm and Submit Offer", function(){
  visit("/offers/"+offer.id);
  andThen(function() {

    click(find("a[href='/offers/"+offer.id+"/confirm']")[0]);
    andThen(function() {

      equal(/Confirm/i.test($('body h3').text()), true);
      equal(currentURL(), "/offers/"+offer.id+"/confirm");

      // confirm offer page has submit link
      equal(find("a[href='/offers/"+offer.id+"/submit']").length, 1);

      click(find("a[href='/offers/"+offer.id+"/submit']")[0]);
      andThen(function() {

        equal(/Sale of goods/i.test($('body h3').text()), true);
        equal(currentURL(), "/offers/"+offer.id+"/submit");

        click($("button:contains('Yes')")[0]);
        andThen(function() {

          equal(currentURL(), "/offers/"+offer.id+"/review_status");
        });
      });
    });
  });
});
