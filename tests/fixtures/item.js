import itemsFactory from './offer';

FactoryGuy.define('item', {
  sequences: {
    collectionContactName: function(num) {
      return 'John' + num;
    }
  },
  default: {
    state:                'draft',
    createdAt:            '12/01/2014',
    updatedAt:            '12/01/2014',
    donorDescription:     'example1',
    rejectionOtherReason: 'example1',
    imageIdentifiers:     'example1,example2',
    favouriteImage:       'example1',
    offer:                {}
  }
});

export default {};
