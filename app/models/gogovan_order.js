import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  bookingId:     attr('number'),
  status:        attr('string'),
  pickupTime:    attr('date'),
  districtId:    attr('number'),
  territoryId:   attr('number'),

  needEnglish:   attr('boolean'),
  needCart:      attr('boolean'),
  needCarry:     attr('boolean'),
  baseFee:       attr('string'),

  delivery:      belongsTo('delivery'),
});
