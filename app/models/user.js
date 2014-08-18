import DS from 'ember-data';
var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  mobile:  attr('string'),
  district:  belongsTo('district'),
  messages:  hasMany('message'),
  offers:  hasMany('offer')
});
