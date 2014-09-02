import DS from 'ember-data';
var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  language:                 attr('string'),
  state:                    attr('string'),
  collectionContactName:    attr('string'),
  collectionContactPhone:   attr('string'),
  origin:                   attr('string'),
  stairs:                   attr('boolean'),
  parking:                  attr('boolean'),
  estimatedSize:            attr('string'),
  notes:                    attr('string'),
  createdById:              attr('number'),
  createdAt:                attr('date'),
  updatedAt:                attr('date'),
  items:                    hasMany('item'),
  messages:                 hasMany('message'),

  // User details
  userName:                 attr('string'),
  userPhone:                attr('string'),

  userId:                   attr('number'),
  user:                     belongsTo('user'),

  // used for items of current-offer
  saleable:                 attr('boolean'),

  itemCount: function() {
    return this.get("items.length");
  }.property('this.items.@each')
});
