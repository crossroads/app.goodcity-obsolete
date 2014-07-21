import Ember from 'ember';

export default Ember.Controller.extend({

  imageIds: Object.keys(JSON.parse(localStorage.image_ids || "{}")),

  // imageIds: function() {
  //   return Object.keys(JSON.parse(localStorage.image_ids || "{}"));
  // }.property('localStorage.image_ids.@each'),

  previewImageId: function() {
    return this.imageIds[0]
  }.property('this.imageIds'),

  noImage: function() {
    return this.imageIds.length === 0;
  }.property('this.imageIds'),

  actions: {
    addDetails: function() {
      this.transitionToRoute('items.add_item');
    },

    removeImage: function(image_id) {
      var uploaded = JSON.parse(localStorage.image_ids || "{}");
      delete uploaded[image_id]
      localStorage.image_ids = JSON.stringify(uploaded);
      this.set("imageIds", Object.keys(JSON.parse(localStorage.image_ids || "{}")));
    },

    updatePreview: function(image_id){
      this.set("previewImageId", image_id);
      var uploaded = JSON.parse(localStorage.image_ids || "{}");
      uploaded[image_id] = image_id;
      localStorage.image_ids = JSON.stringify(uploaded);
      this.set("imageIds", Object.keys(JSON.parse(localStorage.image_ids)));
    }
  },

  init: function(){
    var controller = this;

    Ember.$('body').on('click', ".current_image", function() {
      var public_id = Ember.$(this).attr('id');
      controller.set("previewImageId", public_id);
    });
  }
});
