import Ember from 'ember';

export default Ember.Controller.extend({

  imageIds: function(key, value) {
    var ids = arguments.length > 1 ? value : (localStorage.image_ids || "[]");
    return JSON.parse(ids);
  }.property(),

  previewImageId: function(key, value) {
    return (arguments.length > 1 ? value : this.get("imageIds.firstObject"));
  }.property('imageIds.[]'),

  noImage: function(key, value) {
    return ( arguments.length > 1 ? value : this.get('imageIds.length') === 0);
  }.property('imageIds.[]'),

  addMoreImages: function(key, value) {
    return ( arguments.length > 1 ? value : this.get('noImage'));
  }.property('noImage'),

  favourite: function(key, value) {
    if(arguments.length > 1) {
      localStorage.favourite = value;
    }
    return localStorage.favourite;
  }.property(),

  actions: {
    addDetails: function() {
      this.transitionToRoute('items.add_item');
    },

    setFavouriteImage: function(image_id) {
      this.set("favourite", image_id);
    },

    removeImage: function(image_id) {
      var uploaded = JSON.parse(localStorage.image_ids || "[]");
      uploaded.removeObject(image_id);
      localStorage.image_ids = JSON.stringify(uploaded);
      this.get("imageIds").removeObject(image_id);

      if(localStorage.favourite === image_id){
        this.set("favourite", this.get("imageIds.firstObject") || "");
      }
    },

    updatePreview: function(image_id){
      if(JSON.parse(localStorage.image_ids|| "[]").length === 0) {
        this.set("favourite", image_id);
      }

      var uploaded = JSON.parse(localStorage.image_ids || "[]");
      uploaded.push(image_id);
      localStorage.image_ids = JSON.stringify(uploaded);
      this.get("imageIds").unshiftObject(image_id);
    },
  },

  init: function(){
    var controller = this;

    Ember.$('body #current_item').on('click', ".current_image", function() {
      var public_id = Ember.$(this).attr('id');
      controller.set("previewImageId", public_id);
    });

    Ember.$('body #current_item').on('click', ".more_image_link", function() {
      controller.set("addMoreImages", true);
    });

  }

});
