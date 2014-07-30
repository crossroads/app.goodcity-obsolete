import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(value, options) {
  var tag = Ember.$.cloudinary.image(value.split('/')[1], {
    version: value.split('/')[0],
    height: options.hash['height'],
    width: options.hash['width'],
    class: 'current_image '+ options.hash['className'],
    crop: (options.hash['width'] === 50 ? 'fill' : 'fit'),
    border: (options.hash['width'] === 50 ? '2px_solid_grey' : '0px_solid_grey'),
    id: value
  });

  return new Ember.Handlebars.SafeString(tag[0].outerHTML);

});
