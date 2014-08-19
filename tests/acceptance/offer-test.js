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
    equal($("img[src='"+image_url+"']").length, 1);
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
