import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  flat:        attr('string'),
  building:    attr('string'),
  street:      attr('string'),
  addressType: attr('string'),

  district:   belongsTo('district'),
  addressable: belongsTo('addressable', {
    polymorphic: true
  })
});
