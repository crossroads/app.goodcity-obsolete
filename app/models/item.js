import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo,
    hasMany   = DS.hasMany;

export default DS.Model.extend({
  donorDescription:     attr('string'),
  state:                attr('string'),
  offerId:              attr('number'),
  itemTypeId:           attr('number'),
  rejectionReasonId:    attr('number'),
  rejectionOtherReason: attr('string'),
  createdAt:            attr('date'),
  updatedAt:            attr('date'),
  packages:             hasMany('package'),
  messages:             hasMany('message'),
  images:               hasMany('images'),
  offer:                belongsTo('offer'),
  donorCondition:       belongsTo('donor_condition'),

  //input to store image public-ids
  imageIdentifiers:     attr('string'),
  favouriteImage:       attr('string'),

  defaultImage: function() {
    var images    = this.get('images');
    var fav_image = images && images.findBy('favourite', 'true');
    var image_url = fav_image ? fav_image.get('thumbImageUrl') : "assets/images/default_item.jpg";

    return image_url;
  }.property('this.images.@each')

});
