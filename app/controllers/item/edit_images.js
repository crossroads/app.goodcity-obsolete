import Ember from 'ember';

export default Ember.ObjectController.extend({

  imageIds: function(key, value) {
    var ids;
    if(arguments.length > 1) {
      ids = value;
      if(JSON.parse(value).length > 0) {
        this.set('imageIdentifiers', JSON.parse(value));
      }
    } else {
      ids = JSON.stringify(this.get('imageIdentifiers').split(','));
    }

    return (JSON.parse(ids || "[]"));
  }.property("imageIdentifiers"),

  hasOneImage: function() {
    return this.get('imageIds.length') > 1;
  }.property('imageIds.[]'),

  previewImageId: function(key, value) {
    return (arguments.length > 1 ? value : this.get('imageIds.firstObject'));
  }.property('imageIds.[]'),

  noImage: function(key, value) {
    return ( arguments.length > 1 ? value : this.get('imageIds.length') === 0);
  }.property('imageIds.[]'),

  addMoreImages: function(key, value) {
    return ( arguments.length > 1 ? value : this.get('noImage'));
  }.property('noImage'),

  favourite: function(key, value) {
    if(arguments.length > 1) {
      this.set('favouriteImage', value);
    }
    return this.get('favouriteImage');
  }.property("favouriteImage"),

  actions: {
    updateDetails: function() {
      this.transitionToRoute('item.edit');
    },

    setFavouriteImage: function(image_id) {
      this.set("favourite", image_id);
    },

    removeImage: function(image_id) {
      var image_array = this.get("imageIds")|| [];
      image_array.removeObject(image_id);
      this.set("imageIds", JSON.stringify(image_array));

      if(this.get("favourite") === image_id){
        this.set("favourite", this.get("imageIds.firstObject") || "");
      }
    },

    // After adding new image update preview
    updatePreview: function(image_id){
      var image_array = this.get("imageIds")|| [];
      if(image_array.length === 0) {
        this.set("favourite", image_id);
      }

      image_array.unshiftObject(image_id);
      this.set("imageIds", JSON.stringify(image_array));
    },

    back: function() {
      this.transitionToRoute('item.edit');
    }

  },

  init: function(){
    var controller = this;

    Ember.$('body').on('click', ".current_image", function() {
      var public_id = Ember.$(this).attr('id');
      controller.set("previewImageId", public_id);
    });

    Ember.$('body').on('click', ".more_image_link", function() {
      controller.set("addMoreImages", true);
    });
  }

});
