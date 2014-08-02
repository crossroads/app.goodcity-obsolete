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
  //~ favouriteImage:       function() {
    //~ var images = this.get('images');
    //~ return (images && images.findBy('favourite', 'true'));
  //~ }.property('this.images.@each'),

  // favouriteImage or first image or placeholder image
  defaultImageURL: function() {
    var image_url;
    var images    = this.get('images');
    //~ var favourite_image = this.get('favouriteImage');
    var favourite_image = images && images.findBy('favourite', 'true');
    if (favourite_image) {
      image_url = favourite_image.get('thumbImageUrl');
    } else if (images.get('length') > 0) {
      image_url = this.get('images.firstObject').get('thumbImageUrl');
    } else {
      image_url = "assets/images/default_item.jpg";
    }
    return image_url;
  }.property('this.images.@each'),

});
