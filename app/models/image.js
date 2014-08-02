import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  imageUrl:      attr('string'),
  thumbImageUrl: attr('string'),
  favourite:     attr('string'),
  //~ favourite:     attr('boolean', {defaultValue: false}),
  order:         attr('number'),
  imageId:       attr('string')
});
