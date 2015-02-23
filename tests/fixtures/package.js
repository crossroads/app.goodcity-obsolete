import itemsFactory from './item';
import itemTypesFactory from './item_type';

FactoryGuy.define('package', {
  sequences: {
    id: function(num) {
      return num + 100;
    }
  },
  default: {
    id:       FactoryGuy.generate('id'),
    quantity: 1,
    length:   10,
    width:    10,
    height:   10,
    item:     FactoryGuy.belongsTo('item'),
    packageType:  FactoryGuy.belongsTo('item_type'),
    notes:    "example",
  }
});

export default {};
