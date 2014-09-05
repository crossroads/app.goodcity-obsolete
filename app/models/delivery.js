import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  offerId:       attr('number'),
  contactId:     attr('number'),
  scheduleId:    attr('number'),
  start:         attr('date'),
  finish:        attr('date'),
  deliveryType:  attr('string'),

  offer:         belongsTo('offer'),
  contact:       belongsTo('contact'),
  schedule:      belongsTo('schedule')
});
