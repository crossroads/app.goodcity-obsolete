import Ember from 'ember';
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
  createdBy:      belongsTo('user'),
  reviewedBy:     belongsTo('user'),

  // User details
  userName:       attr('string'),
  userPhone:      attr('string'),

  itemCount: function() {
    return this.get("items").rejectBy("state", "draft").get("length");
  }.property('items.@each.state'),

  unreadMessagesCount: function() {
    return this.get('messages').filterBy('state', 'unread').length;
  }.property('this.messages.@each'),

  approvedtems: Ember.computed.filterBy("items", "state", "accepted"),
  rejectedItems: Ember.computed.filterBy("items", "state", "rejected"),
  isDraft: Ember.computed.equal("state", "draft"),
  isSubmitted: Ember.computed.equal("state", "submitted"),
  isScheduled: Ember.computed.equal("state", "scheduled"),
  isUnderReview: Ember.computed.equal("state", "under_review"),
  isReviewed: Ember.computed.equal("state", "reviewed"),

  displayImageUrl: function(){
    return this.get("items").rejectBy("images.length", 0).sortBy("id")
      .get("firstObject.displayImageUrl") || "/assets/images/default_item.jpg";
  }.property('items.@each.displayImageUrl'),

  isCharitableSale: function() {
    var item = this.get("items.content.firstObject");
    return ((item && item.get('saleable')) ? "Yes" : "No");
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
