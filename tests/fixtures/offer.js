import itemsFactory from './item';

FactoryGuy.define('offer', {
  default: {
    language: 'en',
    state: 'draft',
    origin: 'trial',
    stairs: true,
    parking: true,
    estimatedSize: '12cm',
    notes: 'dummy text',
    createdBy: FactoryGuy.belongsTo("user"),
    reviewedBy: FactoryGuy.belongsTo("user"),
    delivery: FactoryGuy.belongsTo("delivery"),
    createdAt: '12/01/2014',
    updatedAt: '12/01/2014'
  },
  offer_with_items: {
    items: function(){ return FactoryGuy.buildList('item', 2); }
  }
});

export default {};
