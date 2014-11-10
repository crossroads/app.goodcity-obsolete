import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Display Offer', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);

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
  var image_url = "http://res.cloudinary.com/ddoadcjjl/image/upload/v1407764294/default/test_image.jpg";

  visit('/offers/1');

  andThen(function() {
    // offer show page
    equal(currentURL(), "/offers/1");
    equal($.trim(find('.tab-bar-section .title').text()), "Offer items (2)");

    // add-item & remove-item buttons and confirm offer link
    // equal(find("a:contains('Add Item')").length, 1);
    equal(find("a[href='/offers/1/confirm']").length, 1);

    // list of all items
    equal(find('.list-offer-items li').length, 2);

    // favourite image for 'item2': default image
    equal(find('img[src="assets/images/default_item.jpg"]').length, 1);

    // favourite image for 'item': image2
    equal(find("img[src='"+image_url+"']").length, 1);
  });
});

test("Confirm and Submit Offer", function(){
  visit("/offers/1");
  click("a[href='/offers/1/confirm']");

  andThen(function() {
    equal(/Confirm/i.test($('body h3').text()), true);
    equal(currentURL(), "/offers/1/confirm");

    // confirm offer page has submit link
    equal(find("a[href='/offers/1/submit']").length, 1);

    click("a[href='/offers/1/submit']");

    andThen(function() {
      equal(/Sale of goods/i.test($('body h3').text()), true);
      equal(currentURL(), "/offers/1/submit");


      click("button:contains('Yes')");

      andThen(function() {
        equal(currentURL(), "/offers/1/review_status");
      });
    });
  });
});

test("Cancel Offer - redirect to offers", function() {
  visit("/offers/1");
  click("a:contains('Cancel Offer')");
  andThen(function() {
    equal(currentURL(), "/offers");
  });
});
