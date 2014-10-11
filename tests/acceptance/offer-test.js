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
  expect(8);

  var image_url = "http://res.cloudinary.com/ddoadcjjl/image/upload/v1407764294/default/test_image.jpg";

  visit('/offers/1');

  andThen(function() {
    // offer show page
    equal(currentURL(), "/offers/1");
    equal($.trim(find('.itemCount').text()), "Offer items (2)");

    // add-item & remove-item buttons and confirm offer link
    equal(find("button.addItem").length, 1);
    equal(find("button.removeItem").length, 2);
    equal(find("a[href='/offers/1/confirm']").length, 1);

    // list of all items (header + 2 items)
    equal(find('table tr').length, 3);

    // favourite image for 'item2': default image
    equal(find('img[src="assets/images/default_item.jpg"]').length, 1);

    // favourite image for 'item': image2
    equal(find("img[src='"+image_url+"']").length, 1);
  });
});

test("Cancel Offer - delete offer called", function() {
  expect(1);

  var offerController = lookup('controller:offer.index');
  offerController.transitionToRoute = function(){};
  var mockedOffer = {
    get: function() { return { content: [] }; },
    destroyRecord: function() {
      ok(true, 'destroyRecord called on offer');
    }
  };

  offerController.send('cancelOffer', mockedOffer);
});

test("Cancel Offer - redirect to offers", function() {
  expect(1);

  lookup('controller:offer.index').transitionToRoute = function (routePath) {
    equal(routePath, 'offers.index');
  };

  visit("/offers/1");
  click("button:contains('Cancel Offer')");
});

test("Remove Item", function() {
  expect(3);

  visit("/offers/1");

  andThen(function() {
    // list of all items (header + 2 items)
    equal(find('table tr').length, 3);
  });

  click("button.removeItem");

  andThen(function() {
    equal(find('table tr').length, 2);
    equal($.trim(find('.itemCount').text()), "Offer items (1)");
  });
});

test("Confirm and Submit Offer", function(){
  expect(6);

  visit("/offers/1");
  click("a[href='/offers/1/confirm']");

  andThen(function() {
    equal(/Confirm/i.test($('body h3').text()), true);
    equal(currentURL(), "/offers/1/confirm");

    // confirm offer page has submit link
    equal(find("a[href='/offers/1/submit']").length, 1);
  });

  click("a[href='/offers/1/submit']");

  andThen(function() {
    equal(/Sale of goods/i.test($('body h3').text()), true);
    equal(currentURL(), "/offers/1/submit");
  });

  click("button:contains('Yes')");

  andThen(function() {
    equal(currentURL(), "/offers/1/review_status");
  });
});
