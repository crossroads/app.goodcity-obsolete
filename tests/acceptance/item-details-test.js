import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);
var App, testHelper, offer1, reviewer, item1, message1, originalAlert;

module('Display Item Details', {
  setup: function() {
    originalAlert = window.alert;
    App = startApp();
    testHelper = TestHelper.setup(App);
    syncDataStub(testHelper);

    reviewer = FactoryGuy.make("user");
    offer1 = FactoryGuy.make("offer", {state:"under_review", reviewedBy: reviewer});
    item1 = FactoryGuy.make("item", {state:"submitted", offer: offer1, donorDescription: "Test Item Description"});
    message1 = FactoryGuy.make("message", {sender: reviewer, offer: offer1, item: item1, state: "read"});
  },

  teardown: function() {
    window.alert = originalAlert;
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("item details", function() {
  visit('/offers/' + offer1.id + "/items/"+ item1.id +"/messages");
  andThen(function() {
    equal(currentURL(), '/offers/' + offer1.id + "/items/"+ item1.id +"/messages");
    // Item Description Details
    equal($.trim(find('h3.ellipsis').text()), item1.get('donorDescription'));

    // Favourite Image of Item
    equal($('.fav-item-image img').attr('src'), item1.get('displayImageUrl'));

    // donor condition detail
    var donorConditionDetails = $.trim(find('h3.ellipsis').next().text());
    equal(donorConditionDetails.indexOf(item1.get('donorCondition.name')) > 0, true);

    // item actions
    equal($('.item_actions a').length, 2);
    equal($('.item_actions a:eq(0)').text(), "Cancel Item");
    equal($('.item_actions a:eq(1)').text(), "Edit Item");
  });
});

test("item deletion", function() {
  var expectedText = Ember.I18n.t("item.cant_delete_last_item");
  window.alert = function(text) {
    equal(text, expectedText, 'expected ' + text + ' to be ' + expectedText);
  };

  visit('/offers/' + offer1.id + "/items/"+ item1.id +"/messages");
  andThen(function() {
    click($('.item_actions a:eq(0)'));
    andThen(function() {
      equal(currentURL(), '/offers/' + offer1.id + "/items/"+ item1.id +"/messages");
    });
  });
});

test("message details", function() {
  visit('/offers/' + offer1.id + "/items/"+ item1.id +"/messages");
  andThen(function() {
    equal(currentURL(), '/offers/' + offer1.id + "/items/"+ item1.id +"/messages");

    // message detail
    var messageDetails = $.trim(find('.my_message').text());
    equal(messageDetails.indexOf(message1.get('body')) > 0, true);
    equal(messageDetails.indexOf(message1.get('sender.firstName')) >= 0, true);

  });
});

test("send message", function() {
  visit('/offers/' + offer1.id + "/items/"+ item1.id +"/messages");
  andThen(function() {
    equal(currentURL(), '/offers/' + offer1.id + "/items/"+ item1.id +"/messages");

    // message form
    fillIn('.message-form textarea', "example4");
    click("button:contains('Send')");
    andThen(function() {
      equal($('.my_message').length, 2);

      var messageDetails = $.trim($($('.my_message')[1]).text());
      equal(messageDetails.indexOf('example4') > 0, true);
      equal(messageDetails.indexOf(reviewer.get('firstName')) >= 0, true);
    });
  });
});
