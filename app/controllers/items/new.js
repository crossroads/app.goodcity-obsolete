import Ember from 'ember';

export default Ember.Controller.extend({

  imageIds: function(key, value) {
    var ids = arguments.length > 1 ? value : localStorage.image_ids;
    return (JSON.parse(ids || "[]"));
  }.property(),

  previewImageId: function(key, value) {
    var preview = arguments.length > 1 ? value : this.get("imageIds.firstObject");
    localStorage.preview = preview;
    return (preview);
  }.property('imageIds.[]'),

  noImage: function(key, value) {
    return ( arguments.length > 1 ? value : this.get('imageIds.length') === 0);
  }.property('imageIds.[]'),

  addMoreImages: function(key, value) {
    return ( arguments.length > 1 ? value : this.get('noImage'));
  }.property('noImage'),

  actions: {
    addDetails: function() {
      this.transitionToRoute('items.add_item');
    },

    removeImage: function(image_id) {
      var uploaded = JSON.parse(localStorage.image_ids || "[]");
      delete uploaded.splice(uploaded.indexOf('image_id'),1);
      localStorage.image_ids = JSON.stringify(uploaded);
      this.get("imageIds").removeObject(image_id);
    },

    updatePreview: function(image_id){
      var uploaded = JSON.parse(localStorage.image_ids || "[]");
      uploaded.push(image_id);
      localStorage.image_ids = JSON.stringify(uploaded);
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
