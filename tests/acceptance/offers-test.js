import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, testHelper,
  TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Offer Index View', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
  },
  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test('Offers list & link to add items', function() {
  visit('/offers');
  andThen(function() {
    equal($('ul.offer_list li').length, 2);

    // test: link to complete offers
    equal($("a:contains('Complete this Offer')").length, 2);
  });
});

test("Offers Details", function() {

  visit('/offers');

  andThen(function() {
    equal($('ul.offer_list li').length, 2);
    var offer_detail = $('ul.offer_list li').first().text();
    var offer_detail_text = $.trim(offer_detail.replace(/\s+/g, " "));

    // test: offer details
    equal(offer_detail_text, "Offer_id: 1 Total items: 2 Complete this Offer");

    // test: complete this offer link
    var complete_offer_link = $('ul.offer_list li').first().find('a');
    equal(complete_offer_link.attr('href'), "/offers/1");
    equal($.trim(complete_offer_link.text()), "Complete this Offer");
  });
});
