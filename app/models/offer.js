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
  reviewedBy:     belongsTo('user', { inverse: 'reviewedOffers'}),

  // User details
  userName:       attr('string'),
  userPhone:      attr('string'),

  itemCount: function() {
    return this.get("items.length");
  }.property('this.items.@each'),

  approvedtems: function(){
    var items = this.get('items');
    return items.filterBy('state', 'accepted');
  }.property('offer.items.@each'),

  rejectedItems: function(){
    var items = this.get('items');
    return items.filterBy('state', 'rejected');
  }.property('offer.items.@each'),

  unreadMessagesCount: function() {
    return this.get('messages').filterBy('state', 'unread').length;
  }.property('this.messages.@each'),

  isDraft: function() {
    return this.get('state') === 'draft';
  }.property('this.state'),

  isSubmitted: function() {
    return this.get('state') === 'submitted';
  }.property('this.state'),

  isScheduled: function() {
    return this.get('state') === 'scheduled';
  }.property('this.state'),

  isUnderReview: function() {
    return this.get('state') === 'under_review';
  }.property('this.state'),

  displayImageId: function(){
    var item = this.get("items.content.firstObject");
    return item.get('favouriteImage');
  }.property('this.items.@each'),

  isCharitableSale: function() {
    var item = this.get("items.content.firstObject");
    return (item.get('saleable') ? "Yes" : "No");
  }.property('this.items.@each'),

  status: function(){
    var state = this.get('state');
    var status;
    switch(state) {
      case 'draft': status = 'Draft'; break;
      case 'under_review' : status = 'In review'; break;
      case 'submitted' : status = 'Submitted'; break;
      case 'reviewed' : status = 'Collection'; break;
      case 'scheduled' : status = 'Collection'; break;
    }
    return status;
  }.property('state')


});
