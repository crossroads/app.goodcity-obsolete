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
  images:               hasMany('image'),
  offer:                belongsTo('offer'),
  donorCondition:       belongsTo('donor_condition'),
  saleable:             attr('boolean'),

  //input to store image public-ids
  imageIdentifiers:     attr('string'),
  favouriteImage:       attr('string'),

  // favouriteImage or first image
  defaultImage: function() {
    var image;
    var images = this.get('images');
    var favourite_image = images && images.findBy('favourite', 'true');
    if (favourite_image) {
      image = favourite_image;
    } else if (images.get('length') > 0) {
      image = this.get('images.firstObject');
    } else {
      image = null;
    }
    return image;
  }.property('this.images.@each'),

  // defaultImage or placeholder
  defaultImageURL: function() {
    var image = this.get('defaultImage');
    return (image ? image.get('thumbImageUrl') : "assets/images/default_item.jpg");
  }.property('defaultImage'),

  defaultImageId: function() {
    var image = this.get('defaultImage');
    return (image ? image.get('imageId') : null);
  }.property('defaultImage'),

});
