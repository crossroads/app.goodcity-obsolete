import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper, testImage1, testImage2,
  item, offer, donor_condition;

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Create New Item', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);

    delete window.localStorage.image_ids;
    delete window.localStorage.favourite;

    testImage1 = "1407764294/default/test_image.jpg";
    testImage2 = "1407916714/default/test_image2.jpg";

    window.localStorage.image_ids = JSON.stringify([testImage1, testImage2]);
    window.localStorage.favourite = testImage1;
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
  expect(4);

  visit("/offers/2");
  andThen(function() {
    click("a:contains('Add item')");

    andThen(function() {
      equal(currentURL(), "/offers/2/items/new");

      // preview-image
      equal(find('.frame-photo img').attr('id'), testImage1);

      // thumbnail-image-list
      equal(find("ul.photo-list img.current_image").length, 2);

      // favourite-image
      var fav_image = find(".icon-key-photo").closest('li').find('img.current_image');
      equal(fav_image.attr('id'), testImage1);
    });
  });
});

test("Clicking on thumbnail image should change preview-image", function() {
  expect(3);

  visit("/offers/2/items/new");

  andThen(function() {
    equal(currentURL(), "/offers/2/items/new");

    // preview-image
    equal(find('.frame-photo img').attr('id'), testImage1);
  });

  // find other thumbnail-image
  click("img[id='"+testImage2+"']");

  andThen(function(){
    equal(find('.frame-photo img').attr('id'), testImage2);
  });
});

test("Change favourite image", function() {
  expect(3);

  visit("/offers/2/items/new");

  andThen(function() {
    equal(currentURL(), "/offers/2/items/new");

    // favourite-image
    var fav_image = find(".icon-key-photo").closest('li').find('img.current_image');
    equal(fav_image.attr('id'), testImage1);
  });

  // find other thumbnail-image
  click("img[id='"+testImage2+"']");
  click('a.setFavourite');

  andThen(function(){
    var fav_image = find(".icon-key-photo").closest('li').find('img.current_image');
    equal(fav_image.attr('id'), testImage2);
  });
});

test("Create Item with details", function() {
  visit("/offers");
  visit("/offers/2/items/new");
  click('button.add_item_link');

  andThen(function() {
    equal(currentURL(), "/offers/2/items/add_item");
    equal(find('img.fav_image').attr('id'), testImage1);
  });

  fillIn("textarea[name=donorDescription]", "this is test item");
  click(":radio[value=1]");

  andThen(function() {
    equal(find("textarea[name=donorDescription]").val(), "this is test item");
  });

  click("button:contains('Save Details')");

  andThen(function(){
    equal(currentURL(), "/offers/2");
    equal($.trim(find('.tab-bar-section .title').text()), "Offer items (1)");
    // equal(find(".item_name").text(), "this is test item");
  });
});
