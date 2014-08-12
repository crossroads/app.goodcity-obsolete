import Ember from 'ember';
import startApp from '../helpers/start-app';
import offersFactory from '../fixtures/offer';
import itemsFactory from '../fixtures/item';

var App, testHelper, store;

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin,{
  // override setup to do a few extra things for view tests
  setup: function (app, opts) {
    app.reset();  // reset ember app before test
    $.mockjaxSettings.logging = false;   // mockjax settings
    $.mockjaxSettings.responseTime = 0;  // mockjax settings
    return this._super(app); // still call the base setup from FactoryGuyTestMixin
  },
  // override teardown to clear mockjax declarations
  teardown: function() {
    $.mockjaxClear();
    this._super();
  }
});

module('Create New Item', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    store = testHelper.getStore();

    delete localStorage.image_ids;
    delete localStorage.favourite;

    $.mockjax({
      type: 'GET',
      url: "http://localhost:3000/api/v1/images/generate_signature",
      responseText: {
        "api_key":   "926849638736153",
        "callback":  "/public/cloudinary_cors.html",
        "signature": "0ff551d3b047a18ff4c28fe0f95b0b39ad344474",
        "timestamp": 1407854176}
    });

    $.mockjax({
      type: 'POST',
      url: "https://api.cloudinary.com/v1_1/ddoadcjjl/auto/upload",
      responseText: {
        "public_id":"zptqt06poc9cmhubob6f",
        "version":1407854479,
        "signature":"647f2d5bcbbc5dd7dee4304808fa318c5fa99a4f",
        "width":240,
        "height":240,
        "format":"png",
        "resource_type":"image",
        "created_at":"2014-08-12T14:41:19Z",
        "bytes":37444,
        "type":"upload",
        "etag":"ab5ebd08ad5491b4967545594cd80dc9",
        "url":"http://res.cloudinary.com/ddoadcjjl/image/upload/v1407854479/zptqt06poc9cmhubob6f.png",
        "secure_url":"https://res.cloudinary.com/ddoadcjjl/image/upload/v1407854479/zptqt06poc9cmhubob6f.png"}
    });
  },

  teardown: function() {
    Em.run(function() { testHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

// **WIP**
test("Add Item with Image", function() {
  var item = store.makeFixture('item');
  var offer = store.makeFixture('offer', {items: [item.id]});

  visit("/offers/"+offer.id);

  andThen(function() {
    click($("button.add_item")[0]);
    andThen(function() {
      equal(currentURL(), "/offers/"+offer.id+"/items/new");

      $.post("https://api.cloudinary.com/v1_1/ddoadcjjl/auto/upload");
      andThen(function(){

      });
    });
  });
});
