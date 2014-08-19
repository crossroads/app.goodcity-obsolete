import Ember from 'ember';
import startApp from '../helpers/start-app';
import itemsFactory from '../fixtures/image';
import itemsFactory from '../fixtures/item';
import offersFactory from '../fixtures/offer';

var App, testHelper, store, image1, image2, item, offer,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

var image_url = "http://res.cloudinary.com/ddoadcjjl/image/upload/v1407764294/default/test_image.jpg"
var image_id = "1407764294/default/test_image.jpg"

image1 = {"id": "1", "image_url": image_url, "thumb_image_url": image_url, "favourite": "false", "order": 1, "image_id": image_id }
image2 = {"id": "2", "image_url": image_url, "thumb_image_url": image_url, "favourite": "false", "order": 1, "image_id": image_id }
item = {"id": "1", "donor_description":'example1', "offer_id": "1", "image_ids": ["1", "2"]};

offer = {"id": "1", "state": "draft", "collection_contact_name": 'TestOffer', "item_ids": ["1"] };

module('Display Item', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    store = testHelper.getStore();

    mockApi(
      'GET',
      "/offers",
      {
        "offers": [ offer ],
        "items":  [ item ],
        "images": [ image1, image2 ]
      });

  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Display Item Details", function() {
  visit("/offers/1/items/1");
  andThen(function(){

    equal(currentURL(), "/offers/1/items/1");
    equal(/Description: example1/i.test($('body').text()), true);

    // item images count
    equal($("img").length, 2);
  });
});

test("Back button redirects to its offer", function() {
  visit("/offers/1/items/1");
  andThen(function(){
    click(find('button.backButton')[0]);
    andThen(function() {
      equal(currentURL(), "/offers/1");
    });
  });
});
