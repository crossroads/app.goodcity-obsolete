import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  body: attr('string'),
  recipientType: attr('string'),
  recipientId: attr('number'),
  senderId: attr('number'),
  private: attr('boolean'),
  createdAt: attr('date'),
  updatedAt: attr('date'),
  sender: belongsTo('sender')
});
