import Ember from 'ember';

export default Ember.Controller.extend({

  imageIds: function() {
    return Object.keys(JSON.parse(localStorage.image_ids || "{}"));
  }.property(),

  previewImageId: function(key, value, previousValue) {
    return ( arguments.length > 1 ? value : this.get("imageIds.firstObject"));
  }.property('imageIds.[]'),

  noImage: function() {
    return this.get('imageIds.length') === 0;
  }.property('imageIds.[]'),

  actions: {
    addDetails: function() {
      this.transitionToRoute('items.add_item');
    },

    removeImage: function(image_id) {
      var uploaded = JSON.parse(localStorage.image_ids || "{}");
      delete uploaded[image_id];
      localStorage.image_ids = JSON.stringify(uploaded);
      this.get("imageIds").removeObject(image_id);
    },

    updatePreview: function(image_id){
      var uploaded = JSON.parse(localStorage.image_ids || "{}");
      uploaded[image_id] = image_id;
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
  }
});
