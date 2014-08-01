import DS from "ember-data";
import { test, moduleForModel } from 'ember-qunit';

moduleForModel('item', 'Item Model', {
  needs: ['model:item', 'model:image', 'model:package', 'model:message', 'model:offer', 'model:donor_condition']
});

test('Item is a valid ember-data Model', function () {
  var store  = this.store();
  var record = null;

  Ember.run(function() {
    store.createRecord('item', {id: 1, state: 'draft', donorDescription: 'test-item'});
    record = store.getById('item', 1);
  });

  equal(record.get('donorDescription'), 'test-item');
});

test('Default image for item', function () {
  var store = this.store();
  var defaultImage = null;

  Ember.run(function() {
    var record = store.createRecord('item', {state: 'draft', donorDescription: 'test-item'});
    var image1 = store.createRecord('image', {thumbImageUrl: "testimage1"});
    var image2 = store.createRecord('image', {thumbImageUrl: "testimage2", favourite: 'true'});

    record.get('images').pushObject(image1);
    record.get('images').pushObject(image2);

    defaultImage = record.get('defaultImage');
  });

  equal(defaultImage, "testimage2");
});
