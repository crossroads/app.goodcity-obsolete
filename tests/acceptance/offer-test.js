import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuy.testMixin);
var App, testHelper, store, offer, item1, item2, image;

module('Display Offer', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    store = testHelper.getStore();
    syncDataStub(testHelper);

    offer = store.makeFixture("offer");
    item1 = store.makeFixture("item", {offer:offer,state:"submitted"});
    item2 = store.makeFixture("item", {offer:offer,state:"submitted"});
    image = store.makeFixture("image", {item:item1,favourite:true});
  },

  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Display offer details", function() {
  visit('/offers/' + offer.id);

  andThen(function() {
    // offer show page
    equal(currentURL(), "/offers/" + offer.id);
    equal($.trim(find('.tab-bar-section .title').text()), "Offer items (2)");

    // add-item & remove-item buttons and confirm offer link
    // equal(find("a:contains('Add Item')").length, 1);
    equal(find("a[href='/offers/" + offer.id + "/confirm']").length, 1);

    // list of all items
    equal(find('.list-offer-items li').length, 2);

    // favourite image for 'item2': default image
    equal(find('img[src="/assets/images/default_item.jpg"]').length, 1);

    // favourite image for 'item': image2
    equal(find("img[src='" + image.get("thumbImageUrl") + "']").length, 1);
  });
});

test("Confirm and Submit Offer", function(){
  visit("/offers/" + offer.id);
  click("a[href='/offers/1/confirm']");

  andThen(function() {
    equal(/Confirm/i.test($('body h1').text()), true);
    equal(currentURL(), "/offers/" + offer.id + "/confirm");

    // confirm offer page has submit link
    equal(find("a[href='/offers/" + offer.id + "/submit']").length, 1);

    click("a[href='/offers/" + offer.id + "/submit']");

    andThen(function() {
      equal(/Sale of goods/i.test($('body h3').text()), true);
      equal(currentURL(), "/offers/" + offer.id + "/submit");


      click("button:contains('Yes')");

      andThen(function() {
        equal(currentURL(), "/offers/" + offer.id + "/review_status");
      });
    });
  });
});

test("Cancel Offer - redirect to offers", function() {
  store.makeList("offer", 2);
  visit("/offers/" + offer.id);
  click("a:contains('Cancel Offer')");
  andThen(function() {
    equal(currentURL(), "/offers");
  });
});
