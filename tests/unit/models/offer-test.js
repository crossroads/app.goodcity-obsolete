import DS from "ember-data";
import { test, moduleForModel } from 'ember-qunit';
import testSkip from '../../helpers/test-skip';

moduleForModel('offer', 'Offer Model', {
  needs: ['model:item', 'model:message', 'model:package', 'model:image', 'model:donor_condition',
          'model:delivery', 'model:user']
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

testSkip('Count of items within an offer', function () {
  var store  = this.store();

  Ember.run(function() {
    var item1 = store.makeFixture('item', { state: 'draft' });
    var item2 = store.makeFixture('item', { state: 'draft' });
    var offer = store.makeFixture('offer', { items: [item1.id, item2.id] });

    return store.find('offer', offer.id).then(function(offer1){
      offer1.get('items').then(function(items){
        console.log(offer1.get('itemCount'));
        equal(offer1.get('itemCount'), 2);
      });
    });
  });
});
