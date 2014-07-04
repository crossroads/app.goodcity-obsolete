import DS from 'ember-data';
var attr = DS.attr,
    hasMany = DS.hasMany ;

export default DS.Model.extend({
  firstName: attr('string'),
  lastName:  attr('string'),
  createdAt: attr('date'),
  updatedAt: attr('date'),
  messages:  hasMany('message')
});
