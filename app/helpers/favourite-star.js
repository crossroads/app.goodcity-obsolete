import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(current_image_id, favourite_image_id) {

  var image_tag;
  if(favourite_image_id === current_image_id){
    image_tag = "<img src='assets/images/star_circle.png' class='fav_star'></img>";
  }

  return image_tag ? (new Ember.Handlebars.SafeString(image_tag)) : null;

});
