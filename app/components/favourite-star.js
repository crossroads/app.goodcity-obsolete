import Ember from 'ember';

//~ {{favourite-star imageId=image_id favouriteId=favourite_image_id

export default Ember.Component.extend({

  tagName: 'span',
  classNames: ['fav_star'],

  showStar: function() {
    return this.get('imageId') === this.get('favouriteId');
  }.property('imageId', 'favouriteId'),

});
