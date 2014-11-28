import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuy.testMixin);
var App, testHelper, store;

module('Edit Item', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    store = testHelper.getStore();
    syncDataStub(testHelper);
  },

  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
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
