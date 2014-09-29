import DS from 'ember-data';

var attr = DS.attr,
    hasMany = DS.hasMany;

export default DS.Model.extend({
  resource:    attr('string'),
  slot:        attr('number'),
  slotName:    attr('string'),
  zone:        attr('string'),
  scheduledAt: attr('date'),

  deliveries:   hasMany('delivery')
});
