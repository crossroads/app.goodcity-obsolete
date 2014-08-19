import Ember from 'ember';
import startApp from '../helpers/start-app';
import itemsFactory from '../fixtures/image';
import itemsFactory from '../fixtures/item';
import offersFactory from '../fixtures/offer';

var App, testHelper, store, image1, image2, item1_json, item2_json, offer_json,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

var image_url = "http://res.cloudinary.com/ddoadcjjl/image/upload/v1407764294/default/test_image.jpg"
var image_id = "1407764294/default/test_image.jpg"

image1 = {"id": "1", "image_url": image_url, "thumb_image_url": image_url, "favourite": "false", "order": 1, "image_id": image_id }
image2 = {"id": "2", "image_url": image_url, "thumb_image_url": image_url, "favourite": "true", "order": 1, "image_id": image_id }
item1_json = {"id": "1", "offer_id": "1", "image_ids": ["1", "2"]};

item2_json = {"id": "2", "offer_id": "1"};

offer_json = {"id": "1", "state": "draft", "collection_contact_name": 'TestOffer', "item_ids": ["1", "2"] };


module('Display Offer', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    store = testHelper.getStore();

    mockApi(
      'GET',
      "/offers",
      {
        "offers": [ offer_json ],
        "items":  [ item1_json, item2_json ],
        "images": [ image1, image2 ]
      });

    mockApi(
      'PUT',
      "/offers/1",
      {
        "offers": [ offer_json ],
        "items":  [ item1_json, item2_json ],
        "images": [ image1, image2 ]
      });

    mockApi( 'DELETE', "/offers/1", "");
    mockApi( 'DELETE', "/items/1", "");

    window.confirm = function() {
      return true;
    };
  },

  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Display offer details", function() {
  visit('/offers');
  andThen(function() {

    var link = find("a[href='/offers/1']");
    click(link[0]);
    andThen(function() {

      // offer show page
      equal(currentURL(), "/offers/1");
      equal($.trim($('.itemCount').text()), "Offer items (2)");

      // add-item & remove-item buttons and confirm offer link
      equal($("button.addItem").length, 1);
      equal($("button.removeItem").length, 2);
      equal(find("a[href='/offers/1/confirm']").length, 1);

      // list of all items (header + 2 items)
      equal($('table tr').length, 3);

      // favourite image for 'item2': default image
      equal($('img[src="assets/images/default_item.jpg"]').length, 1);

      // favourite image for 'item': image2
      equal($("img[src='"+image2.thumb_image_url+"']").length, 1);
    });
  });
});

test("Cancel Offer", function() {
  visit("/offers/1");
  andThen(function() {

    click($("button:contains('Cancel Offer')")[0]);
    andThen(function() {
      equal(currentURL(), "/offers");
    });
  });
});

test("Remove Item", function() {
  visit("/offers/1");
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
  visit("/offers/1");
  andThen(function() {

    click(find("a[href='/offers/1/confirm']")[0]);
    andThen(function() {

      equal(/Confirm/i.test($('body h3').text()), true);
      equal(currentURL(), "/offers/1/confirm");

      // confirm offer page has submit link
      equal(find("a[href='/offers/1/submit']").length, 1);

      click(find("a[href='/offers/1/submit']")[0]);
      andThen(function() {

        equal(/Sale of goods/i.test($('body h3').text()), true);
        equal(currentURL(), "/offers/1/submit");

        click($("button:contains('Yes')")[0]);
        andThen(function() {

          equal(currentURL(), "/offers/1/review_status");
        });
      });
    });
  });
});
