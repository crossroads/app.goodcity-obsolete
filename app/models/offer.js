import DS from 'ember-data';
var attr = DS.attr,
    hasMany = DS.hasMany;

export default DS.Model.extend({
  collectionContactName:   attr('string'),
  collectionContactPhone:  attr('string'),
  estimatedSize:           attr('string'),
  notes:                   attr('string'),
  origin:                  attr('string'),
  parking:                 attr('boolean'),
  stairs:                  attr('boolean'),
  state:                   attr('string'),
  title:                   attr('string'),
  items: hasMany('item')
});
