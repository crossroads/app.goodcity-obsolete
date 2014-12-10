import Ember from 'ember';
import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo,
    hasMany   = DS.hasMany;

export default DS.Model.extend({
  donorDescription:     attr('string'),
  state:                attr('string'),
  offerId:              attr('number'),
  rejectReason:         attr('string'),
  rejectionComments:    attr('string'),
  createdAt:            attr('date'),
  updatedAt:            attr('date'),
  packages:             hasMany('package'),
  messages:             hasMany('message'),
  images:               hasMany('image'),
  offer:                belongsTo('offer'),
  itemType:             belongsTo('item_type'),
  donorCondition:       belongsTo('donor_condition'),
  rejectionReason:      belongsTo('rejection_reason'),
  saleable:             attr('boolean'),
  state_event:          attr('string'),

  displayImage: function() {
    return this.get("images").filterBy("favourite").get("firstObject") ||
      this.get("images").sortBy("id").get("firstObject") || null;
  }.property('images.@each.favourite'),

  displayImageUrl: function() {
    return this.get('displayImage.thumbImageUrl') || "/assets/images/default_item.jpg";
  }.property('displayImage'),

  imageCount: Ember.computed.alias("images.length")
});
