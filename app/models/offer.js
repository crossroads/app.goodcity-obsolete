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

  gogovanTransport:    belongsTo('gogovan_transport'),
  crossroadsTransport: belongsTo('crossroads_transport'),

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
    return this.get("items").rejectBy("state", "draft").length;
  }.property('items.@each.state'),

  unreadMessagesCount: function() {
    return this.get('messages').filterBy('state', 'unread').length;
  }.property('messages.@each.state'),

  approvedItems: Ember.computed.filterBy("items", "state", "accepted"),
  rejectedItems: Ember.computed.filterBy("items", "state", "rejected"),
  isDraft: Ember.computed.equal("state", "draft"),
  isSubmitted: Ember.computed.equal("state", "submitted"),
  isScheduled: Ember.computed.equal("state", "scheduled"),
  isUnderReview: Ember.computed.equal("state", "under_review"),
  isReviewed: Ember.computed.equal("state", "reviewed"),

  isReviewing: function(){
    return this.get('isUnderReview') || this.get('isReviewed');
  }.property('isUnderReview', 'isReviewed'),

  displayImageUrl: function(){
    return this.get("items").rejectBy("images.length", 0).sortBy("id")
      .get("firstObject.displayImageUrl") || "/assets/images/default_item.jpg";
  }.property('items.@each.displayImageUrl'),

  isCharitableSale: function() {
    return this.get("items").rejectBy("saleable", false).length > 0 ? "Yes" : "No";
  }.property('items.@each.saleable'),

  isAccepted: function() {
    return (this.get("approvedItems").length > 0) && this.get('isReviewed');
  }.property('items.@each.saleable'),

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
