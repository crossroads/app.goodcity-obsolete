import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo,
    hasMany   = DS.hasMany;

export default DS.Model.extend({
  donorDescription:     attr('string'),
  donorCondition:       attr('string'),
  state:                attr('string'),
  offerId:              attr('number'),
  itemTypeId:           attr('number'),
  rejectionReasonId:    attr('number'),
  rejectionOtherReason: attr('string'),
  createdAt:            attr('date'),
  updatedAt:            attr('date'),
  packages:             hasMany('package'),
  messages:             hasMany('message'),
  offer:                belongsTo('offer')
});
