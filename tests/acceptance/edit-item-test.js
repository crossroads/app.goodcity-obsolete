import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';

var TestHelper = Ember.Object.createWithMixins(FactoryGuy.testMixin);
var App, testHelper, store, offer, item;

module('Edit Item', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    store = testHelper.getStore();
    syncDataStub(testHelper);

    offer = store.makeFixture("offer");
    item = store.makeFixture("item",{offer:offer});
    store.makeList("donor_condition", 2);
  },

  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("Create Item with details", function() {
  expect(4);

  var edit_item_url = "/offers/" + offer.id + "/items/" + item.id + "/edit";
  visit(edit_item_url);

  andThen(function() {
    equal(currentURL(), edit_item_url);
  });

  fillIn("textarea[name=donorDescription]", "this is test item");
  click(":radio[value=1]");

  andThen(function() {
    equal(find("textarea[name=donorDescription]").val(), "this is test item");
  });

  testHelper.handleUpdate("item", item.id);
  click("button:contains('Save Details')");
  Ember.run(function(){ item.set("state", "submitted"); });

  andThen(function(){
    equal(currentURL(), "/offers/" + offer.id);
    equal($(".info h3").last().text().trim(), "this is test item");
  });
});