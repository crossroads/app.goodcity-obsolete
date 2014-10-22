import Ember from 'ember';

//{{cloudinary-image imageId='1406959628/wjvaksnadntp239n6vwe.png' height=100 width=100 className=imgClass action="setPreviewImageId"}}

export default Ember.Component.extend({

  tagName: 'span',

  imagePath: function() {
    var id = this.get('imageId');
    return id.substring(id.indexOf('/')+1);
  }.property('imageId'),

  version: function() {
    return this.get('imageId').split('/')[0];
  }.property('imageId'),

  hasImageId: function() {
    var image_id = this.get('imageId');
    return !!image_id;
  }.property('imageId'),

  outputImgTag: function() {
    var image_id = this.get('imageId');
    var imagePath = this.get('imagePath');
    var width = this.get('width');
    var height = this.get('height');
    var tag = Ember.$.cloudinary.image(imagePath, {
      version: this.get('version'),
      height: height,
      width: width,
      class: 'current_image '+ (this.get('className') || ''),
      crop: (width === 60 ? 'fill' : 'fit'),
      border: (width === 60 ? '2px_solid_grey' : '0px_solid_grey'),
      id: image_id
    });
    return new Ember.Handlebars.SafeString(tag[0].outerHTML);
  }.property('imageId', 'imagePath', 'width', 'height', 'version', 'className'),

  actions: {
    selectImage: function() {
      this.sendAction('action', this.get('imageId'));
    },
  }

});
