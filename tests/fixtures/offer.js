FactoryGuy.define('offer', {
  sequences: {
    collectionContactName: function(num) {
      return 'John' + num;
    }
  },
  default: {
    name: 'Hi',
    language: 'en',
    state: 'draft',
    collectionContactName: FactoryGuy.generate('collectionContactName'),
    collectionContactPhone: '34324343122',
    origin: 'trial',
    stairs: 'trial',
    parking: 'dummy',
    estimatedSize: '12cm',
    notes: 'dummy text',
    createdById: 1,
    createdAt: '12/01/2014',
    updatedAt: '12/01/2014'
  }
});

export default {};
