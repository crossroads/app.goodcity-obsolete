import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo,
    hasMany   = DS.hasMany;

export default DS.Model.extend({
  donorDescription:     attr('string'),
  donorCondition:       attr('string'),
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

  //input to store image public-ids
  imageIdentifiers:     attr('string'),

  defaultImage: function() {
    var image;
    if(this._data.images.length>0) {
      image = this._data.images[0]._data.thumbImageUrl;
    }
    else {
      image = "http://res.cloudinary.com/ddoadcjjl/image/upload/v1405412825/default/default_member_60.jpg";
    }
    return image;
  }.property('this.images.@each')
});
