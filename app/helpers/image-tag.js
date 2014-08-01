import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(value, options) {
  var html;
  if (value) {
    var image = value.split('/')[1];
    var version = value.split('/')[0];
    var tag = Ember.$.cloudinary.image(image, {
      version: version,
      height: options.hash['height'],
      width: options.hash['width'],
      class: 'current_image '+ (options.hash['className'] || ''),
      crop: (options.hash['width'] === 50 ? 'fill' : 'fit'),
      border: (options.hash['width'] === 50 ? '2px_solid_grey' : '0px_solid_grey'),
      id: value
    });
    html = tag[0].outerHTML;
  } else {
    html = '<img src="assets/images/default_item.jpg">';
  }
  return new Ember.Handlebars.SafeString(html);

});
