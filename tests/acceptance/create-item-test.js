import Ember from 'ember';
import startApp from '../helpers/start-app';
import offersFactory from '../fixtures/offer';
import itemsFactory from '../fixtures/item';
import donorConditionsFactory from '../fixtures/donor_condition';

var App, testHelper, store, testImage1, testImage2,
  item, offer, donor_condition;

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
    donor_condition = store.makeFixture('donor_condition', {name: 'New'});

    Ember.run(function(){
      store.find('donor_condition', donor_condition.id);
    });

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

// Display previously uploaded images from localStorage
test("Add Image: display previously added images", function() {
  visit("/offers/"+offer.id);

  andThen(function() {
    click($("button.addItem")[0]);
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

test("Clicking on thumbnail image should change preview-image", function() {
  visit("/offers/"+offer.id+"/items/new");
  andThen(function() {
    equal(currentURL(), "/offers/"+offer.id+"/items/new");

    // preview-image
    var preview_image = $('.file_preview img')[0];
    equal($(preview_image).attr('id'), testImage1);

    // find other thumbnail-image
    click(find("img[id='"+testImage2+"']"));
    andThen(function(){
      var preview_image = $('.file_preview img')[0];
      equal($(preview_image).attr('id'), testImage2);
    });
  });
});

test("Change favourite image", function() {
  visit("/offers/"+offer.id+"/items/new");
  andThen(function() {
    equal(currentURL(), "/offers/"+offer.id+"/items/new");

    // favourite-image
    var fav_image = $("img.favourite").closest('li').find('img.current_image');
    equal($(fav_image).attr('id'), testImage1);

    // find other thumbnail-image
    click(find("img[id='"+testImage2+"']"));
    andThen(function(){

      click(find('button.setFavourite'));
      andThen(function(){
        var fav_image = $("img.favourite").closest('li').find('img.current_image');
        equal($(fav_image).attr('id'), testImage2);
        equal($(fav_image).attr('id'), testImage2);
      });
    });
  });
});

test("Create Item with details", function(){
  visit("/offers/"+offer.id+"/items/new");
  andThen(function(){
    click(find('button.add_item_link'));
    andThen(function(){
      equal(currentURL(), "/offers/"+offer.id+"/items/add_item");
      equal($('img.fav_image').attr('id'), testImage1);

      fillIn("textarea[name=donorDescription]", "this is test item");
      click(find(":radio[value=1]"));
      andThen(function(){

        equal($("textarea[name=donorDescription]").val(),"this is test item");
        click(find("button:contains('Next')"));
        andThen(function(){

          equal(currentURL(), "/offers/"+offer.id);
        });
      });
    });
  });
});
