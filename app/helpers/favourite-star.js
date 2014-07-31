import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(current_image, favourite, options) {

  var image_tag;
  if(options.hash['isNew']) {
    if(favourite === current_image){
      image_tag = "<img src='assets/images/star_circle.png' class='fav_star'></img>";
    }
  }

  var image = image_tag ? (new Ember.Handlebars.SafeString(image_tag)) : null;
  return image;

});
