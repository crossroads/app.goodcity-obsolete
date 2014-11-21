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
  // favouriteImage or first image
  defaultImage: function() {
    return this.get("images").filterBy("favourite").get("firstObject") ||
      this.get("images").sortBy("id").get("firstObject") || null;
  }.property('images.@each.favourite'),

  // defaultImage or placeholder
  defaultImageURL: function() {
    return this.get('defaultImage.thumbImageUrl') || "/assets/images/default_item.jpg";
  }.property('defaultImage'),

  defaultImageId: Ember.computed.alias("defaultImage.imageId"),
  imageCount: Ember.computed.alias("images.length")
});
