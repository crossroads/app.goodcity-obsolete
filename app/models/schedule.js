import DS from 'ember-data';

var attr = DS.attr,
    hasMany = DS.hasMany;

export default DS.Model.extend({
  resource:    attr('string'),
  slot:        attr('number'),
  slot_name:   attr('string'),
  zone:        attr('string'),
  scheduled_at: attr('date'),

   deliveries:   hasMany('delivery')
});
