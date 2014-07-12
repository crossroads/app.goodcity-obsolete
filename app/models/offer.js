import DS from 'ember-data';
var attr = DS.attr,
    hasMany = DS.hasMany;

export default DS.Model.extend({
  language:                 attr('string'),
  state:                    attr('string'),
  collectionContactName:    attr('string'),
  collectionContactPhone:   attr('string'),
  origin:                   attr('string'),
  stairs:                   attr('boolean'),
  parking:                  attr('boolean'),
  estimatedSize:            attr('string'),
  notes:                    attr('string'),
  createdById:              attr('number'),
  createdAt:                attr('date'),
  updatedAt:                attr('date'),
  items:                    hasMany('item'),
  messages:                 hasMany('message')
});
