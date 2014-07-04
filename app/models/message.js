import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  title: attr('string'),
  sender: belongsTo('sender')
});
