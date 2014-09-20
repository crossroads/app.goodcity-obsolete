import DS from 'ember-data';
var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  language:       attr('string'),
  state:          attr('string', {defaultValue: 'draft'}),
  origin:         attr('string'),
  stairs:         attr('boolean'),
  parking:        attr('boolean'),
  estimatedSize:  attr('string'),
  notes:          attr('string'),
  createdById:    attr('number'),
  createdAt:      attr('date'),
  updatedAt:      attr('date'),
  submittedAt:    attr('date'),
  state_event:    attr('string'),
  reviewedAt:     attr('date'),

  // used for items of current-offer
  saleable:       attr('boolean'),

  items:          hasMany('item'),
  messages:       hasMany('message'),

  delivery:       belongsTo('delivery'),
  user:           belongsTo('user', { inverse: 'offers'}),
  reviewedBy:     belongsTo('user', { inverse: 'reviewed_offers'}),

  // User details
  userName:       attr('string'),
  userPhone:      attr('string'),

  itemCount: function() {
    return this.get("items.length");
  }.property('this.items.@each'),

  isDraft: function() {
    return this.get('state') === 'draft';
  }.property('this.state'),

  isSubmitted: function() {
    return this.get('state') === 'submitted';
  }.property('this.state'),

  isScheduled: function() {
    return this.get('state') === 'scheduled';
  }.property('this.state'),

  displayImageId: function(){
    var item = this.get("items.content.firstObject");
    return item.get('favouriteImage');
  }.property('this.items.@each')

});
