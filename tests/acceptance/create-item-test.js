import Ember from 'ember';
import startApp from '../helpers/start-app';
import offersFactory from '../fixtures/offer';
import itemsFactory from '../fixtures/item';

var App, testHelper, store, testImage1, testImage2,
  item, offer;

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin,{
  // override setup to do a few extra things for view tests
  setup: function (app, opts) {
    app.reset();  // reset ember app before test
    $.mockjaxSettings.logging = false;   // mockjax settings
    $.mockjaxSettings.responseTime = 0;  // mockjax settings
    return this._super(app); // still call the base setup from FactoryGuyTestMixin
  },
  // override teardown to clear mockjax declarations
  teardown: function() {
    $.mockjaxClear();
    this._super();
  }
});

module('Create New Item', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    store = testHelper.getStore();

    item = store.makeFixture('item');
    offer = store.makeFixture('offer', {items: [item.id]});

    delete window.localStorage.image_ids;
    delete window.localStorage.favourite;

    testImage1 = "1407764294/default/test_image.jpg";
    testImage2 = "1407916714/default/test_image2.jpg";

    window.localStorage.image_ids = JSON.stringify([testImage1, testImage2]);
    window.localStorage.favourite = testImage1;

    $.mockjax({
      type: 'GET',
      url: "http://localhost:3000/api/v1/images/generate_signature",
      responseText: {
        "api_key":   "926849638736153",
        "callback":  "/public/cloudinary_cors.html",
        "signature": "0ff551d3b047a18ff4c28fe0f95b0b39ad344474",
        "timestamp": 1407854176}
    });
  },

  teardown: function() {
    delete window.localStorage.image_ids;
    delete window.localStorage.favourite;

    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

// Display previously uploaded images
test("Add Image: display previously added images", function() {
  visit("/offers/"+offer.id);

  andThen(function() {
    click($("button.add_item")[0]);
    andThen(function() {
      equal(currentURL(), "/offers/"+offer.id+"/items/new");

      // preview-image
      var preview_image = $('.file_preview img')[0];
      equal($(preview_image).attr('id'), testImage1);

      // thumbnail-image-list
      equal($("ul.image_list img.current_image").length, 2);

      // favourite-image
      var fav_image = $("img.favourite").closest('li').find('img.current_image');
      equal($(fav_image).attr('id'), testImage1);
    });
  });
});
