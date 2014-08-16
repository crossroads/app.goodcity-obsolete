import itemsFactory from './item';

FactoryGuy.define('offer', {
  sequences: {
    collectionContactName: function(num) {
      return 'John' + num;
    },

    offerId: function(num) {
      return num;
    }
  },
  default: {
    id: FactoryGuy.generate('offerId'),
    language: 'en',
    state: 'draft',
    collectionContactName: FactoryGuy.generate('collectionContactName'),
    collectionContactPhone: '34324343122',
    origin: 'trial',
    stairs: true,
    parking: true,
    estimatedSize: '12cm',
    notes: 'dummy text',
    createdById: 1,
    createdAt: '12/01/2014',
    updatedAt: '12/01/2014'
  },
  offer_with_items: {
    items: function(){ return FactoryGuy.buildList('item', 2); }
  },
});

export default {};
