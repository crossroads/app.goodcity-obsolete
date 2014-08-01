import DS from "ember-data";
import { test, moduleForModel } from 'ember-qunit';

moduleForModel('offer', 'Offer Model', {
  needs: ['model:item', 'model:message', 'model:package', 'model:image', 'model:donor_condition']
});

test('offer is a valid ember-data Model', function () {
  var store  = this.store();
  var record = null;

  Ember.run(function() {
    store.createRecord('offer', {id: 1, collectionContactName: 'Test'});
    record = store.getById('offer', 1);
  });

  equal(record.get('collectionContactName'), 'Test');
});

test('Count of items within an offer', function () {
  var store  = this.store();
  var record = null;
  var item_count = null;

  Ember.run(function() {
    store.createRecord('offer', {id: 1, collectionContactName: 'Test'});
    record = store.getById('offer', 1);
    store.createRecord('item', {id: 1, state: 'draft', offer: record});
    store.createRecord('item', {id: 2, state: 'draft', offer: record});
    item_count = record.get('itemCount');
  });

  equal(item_count, 2);
});
