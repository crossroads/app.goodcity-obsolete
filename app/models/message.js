import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  body: attr('string'),
  createdAt: attr('date'),
  isPrivate: attr('boolean'),
  itemId: attr('number'),
  offerId: attr('number'),
  recipientId: attr('number'),
  senderId: attr('number'),
  state: attr('string'),
  updatedAt: attr('date'),

  sender: belongsTo('sender'),
  recipient: belongsTo('recipient')
});
