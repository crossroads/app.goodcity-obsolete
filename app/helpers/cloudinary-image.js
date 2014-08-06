import Ember from "ember";

// takes a cloudinary image_id e.g. 1406959628/wjvaksnadntp239n6vwe.png and converts it into an image tag
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
