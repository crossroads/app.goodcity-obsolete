import DS from 'ember-data';

export default DS.Model.extend({
  quantity: DS.attr('string'),
  item: DS.belongsTo('item')
});
