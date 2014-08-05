import Ember from 'ember';
import startApp from '../helpers/start-app';
import offersFactory from '../fixtures/offer';


var App,
    testHelper,
    store;
var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Acceptance: Offers', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    store = testHelper.getStore();
    store.makeList('offer', 1);
  },
  teardown: function() {
    Ember.run(function () {
      testHelper.teardown();
    });
    Ember.run(App, 'destroy');
  }
});
