import offersFactory from './offer';

FactoryGuy.define('item', {
  default: {
    state:                'draft',
    createdAt:            '12/01/2014',
    updatedAt:            '12/01/2014',
    donorDescription:     'example1'
  },
  item_with_offer: {
    offer: FactoryGuy.belongsTo('offer')
  }
});

export default {};
