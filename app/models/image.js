import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  imageUrl:      attr('string'),
  thumbImageUrl: attr('string'),
  favourite:     attr('string'),
  order:         attr('number')
});
