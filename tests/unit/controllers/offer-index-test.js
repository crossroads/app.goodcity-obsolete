import Ember from "ember";
import DS from "ember-data";
import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:offer/index', 'Offer Controller', {
});

test('isDraft value', function () {
  expect(2);
  var ctrl = this.subject();

  Ember.run(function() {
    ctrl.set('model', Ember.Object.create({ state: '' }));

    // check the values before we modify the offer
    equal(ctrl.get('isDraft'), false);

    // modify the state of the offer
    ctrl.get('model').set('state', 'draft');

    // assert that the controllers isDraft has changed
    equal(ctrl.get('isDraft'), true);
  });
});
