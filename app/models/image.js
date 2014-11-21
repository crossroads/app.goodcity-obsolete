import Ember from "ember";
import DS from 'ember-data';

var attr = DS.attr,
  belongsTo = DS.belongsTo;

export default DS.Model.extend({
  favourite:     attr('boolean'),
  cloudinaryId:  attr('string'),
  itemId:        attr('number'),
  item:          belongsTo('item'),

  imageId: Ember.computed.alias("cloudinaryId"),

  imageUrl: function() {
    return this.generateUrl();
  }.property('cloudinaryId'),

  thumbImageUrl: function() {
    return this.generateUrl(120, 120, true);
  }.property('cloudinaryId'),

  generateUrl: function(width, height, crop) {
    //e.g. cloudinaryId = 1406959628/wjvaksnadntp239n6vwe.png
    var id = this.get('cloudinaryId');
    var version = id.split("/")[0];
    var filename = id.split("/")[1];
    return Ember.$.cloudinary.url(filename, {
      version: version,
      height: height,
      width: width,
      crop: crop === true ? 'fill' : 'fit',
      id: id
    });
  }
});
