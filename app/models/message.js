import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({

  body:        attr('string'),
  isPrivate:   attr('boolean'),
  createdAt:   attr('date'),
  updatedAt:   attr('date'),
  state:       attr('string'),

  // senderId:    attr('number'),
  // itemId:      attr('number'),
  // offerId:     attr('number'),
  // recipientId: attr('number'),

  sender:      belongsTo('user'),
  recipient:   belongsTo('user'),
  item:        belongsTo('item'),
  offer:       belongsTo('offer')
});
