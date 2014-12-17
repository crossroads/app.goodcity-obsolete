import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  start:         attr('date'),
  finish:        attr('date'),
  deliveryType:  attr('string'),

  offer:         belongsTo('offer'),
  contact:       belongsTo('contact'),
  schedule:      belongsTo('schedule'),
  gogovanOrder:  belongsTo('gogovan_order'),

  isGogovan: function() {
    return this.get('deliveryType') === 'Gogovan';
  }.property('deliveryType'),

  noDropOff: function() {
    return this.get('deliveryType') !== 'Drop Off';
  }.property('deliveryType')
});
