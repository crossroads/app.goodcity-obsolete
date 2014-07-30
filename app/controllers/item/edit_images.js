import Ember from 'ember';

export default Ember.ObjectController.extend({

  imageIds: function(key, value) {
    var ids = arguments.length > 1 ? value : localStorage.edit_image_ids;
    return (JSON.parse(ids || "[]"));
  }.property(),

  previewImageId: function(key, value) {
    var preview = arguments.length > 1 ? value : this.get("imageIds.firstObject");
    localStorage.edit_preview = preview;
    return (preview);
  }.property('imageIds.[]'),

  noImage: function(key, value) {
    return ( arguments.length > 1 ? value : this.get('imageIds.length') === 0);
  }.property('imageIds.[]'),

  addMoreImages: function(key, value) {
    return ( arguments.length > 1 ? value : this.get('noImage'));
  }.property('noImage'),

  favourite: function(key, value) {
    if(arguments.length > 1) {
      localStorage.edit_favourite = value;
    }
    return localStorage.edit_favourite;
  }.property(),

  actions: {
    updateDetails: function() {
      localStorage.updated_image_ids = localStorage.edit_image_ids;
      localStorage.updated_preview = localStorage.edit_preview;
      localStorage.updated_favourite = localStorage.edit_favourite;
      this.transitionToRoute('item.edit');
    },

    favouriteImage: function(image_id) {
      this.set("favourite", image_id);
    },

    removeImage: function(image_id) {
      var uploaded = JSON.parse(localStorage.edit_image_ids || "[]");
      uploaded.removeObject(image_id);
      localStorage.edit_image_ids = JSON.stringify(uploaded);
      this.get("imageIds").removeObject(image_id);

      if(localStorage.edit_favourite === image_id){
        this.set("favourite", this.get("imageIds.firstObject") || "");
      }
    },

    updatePreview: function(image_id){
      if(JSON.parse(localStorage.edit_image_ids|| "[]").length === 0) {
        this.set("favourite", image_id);
      }

      var uploaded = JSON.parse(localStorage.edit_image_ids || "[]");
      uploaded.push(image_id);
      localStorage.edit_image_ids = JSON.stringify(uploaded);
      this.get("imageIds").unshiftObject(image_id);
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
