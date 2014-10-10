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
  visit("/offers/2");

  andThen(function() {
    click("button.addItem");
    andThen(function() {
      equal(currentURL(), "/offers/2/items/new");

      // preview-image
      equal(find('.file_preview img').attr('id'), testImage1);

      // thumbnail-image-list
      equal(find("ul.image_list img.current_image").length, 2);

      // favourite-image
      var fav_image = find("img.favourite").closest('li').find('img.current_image');
      equal(fav_image.attr('id'), testImage1);
    });
  });
});

test("Clicking on thumbnail image should change preview-image", function() {
  visit("/offers/2/items/new");
  andThen(function() {
    equal(currentURL(), "/offers/2/items/new");

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
  visit("/offers/2/items/new");
  andThen(function() {
    equal(currentURL(), "/offers/2/items/new");

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
  visit("/offers");
  andThen(function(){
    visit("/offers/2/items/new");
    andThen(function(){
      click(find('button.add_item_link'));
      andThen(function(){
        equal(currentURL(), "/offers/2/items/add_item");
        equal($('img.fav_image').attr('id'), testImage1);

        fillIn("textarea[name=donorDescription]", "this is test item");
        click(find(":radio[value=1]"));
        andThen(function(){

          equal($("textarea[name=donorDescription]").val(),"this is test item");
          click(find("button:contains('Next')"));
          andThen(function(){
            equal(currentURL(), "/offers/2");
            equal($.trim($(".item_name").text()), "this is test item");
          });
        });
      });
    });
  });
});
