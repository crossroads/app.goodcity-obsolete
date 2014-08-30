import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  flat:        attr('string'),
  building:    attr('string'),
  street:      attr('string'),
  districtId:  attr('number'),
  addressType: attr('string'),

  addressable: belongsTo('addressable', {
    polymorphic: true
  }),

  district:   belongsTo('district')
});
