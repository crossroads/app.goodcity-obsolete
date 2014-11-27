import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  quantity:        attr('number'),
  length:          attr('number'),
  width:           attr('number'),
  height:          attr('number'),
  notes:           attr('string'),
  state:           attr('string'),
  receivedAt:      attr('date'),
  rejectedAt:      attr('date'),
  createdAt:       attr('date'),
  updatedAt:       attr('date'),
  item:            belongsTo('item'),
  packageType:     belongsTo('item_type')
});
