import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  quantity:        attr('number'),
  length:          attr('number'),
  width:           attr('number'),
  height:          attr('number'),
  notes:           attr('string'),
  item_id:         attr('number'),
  state:           attr('string'),
  received_at:     attr('date'),
  rejected_at:     attr('date'),
  created_at:      attr('date'),
  updated_at:      attr('date'),
  package_type_id: attr('number'),
  item:            belongsTo('item'),
  package_type:    belongsTo('item_type')
});
