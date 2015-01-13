import offersFactory from './offer';

FactoryGuy.define('item', {
  sequences: {
    description: function(num) {
      return 'Donor Description' + num;
    }
  },
  default: {
    state:            'draft',
    createdAt:        '12/01/2014',
    updatedAt:        '12/01/2014',
    donorDescription: FactoryGuy.generate("description"),
    donorCondition:   FactoryGuy.belongsTo('donor_condition'),
  },
  item_with_offer: {
    offer: FactoryGuy.belongsTo('offer')
  }
});

export default {};
