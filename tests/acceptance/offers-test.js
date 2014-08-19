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
    // test: link to add items to existing offer
    equal($('p.offer_link a').attr('href'), "/offers/2");
  });
});

test("Offers Details", function() {

  visit('/offers');

  andThen(function() {
    equal($('ul.offer_list li').length, 2);
    var offer_detail = $('ul.offer_list li').first().text();
    var offer_detail_text = $.trim(offer_detail.replace(/\s+/g, " "));

    // test: offer details
    equal(offer_detail_text, "Offer_id: 1 Name: TestOffer Total items: 2 See more...");

    // test: offer name
    equal(/TestOffer/i.test($('ul.offer_list li').text()), true);

    // test: show offer details link
    equal($('ul.offer_list li').first().find('a').attr('href'), "/offers/1");
  });
});
