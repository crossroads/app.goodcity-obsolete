import Ember from 'ember';

// {{upload-images item=this }}

export default Ember.Component.extend({

  isNew: function() {
    var item = this.get('item');
    return !(item && item.get('isNew') === false);
  }.property('item.isNew'),

  previewImageId: function(key, value) {
    return (arguments.length > 1 ? value : this.get("imageIds.firstObject"));
  }.property('imageIds.[]'),

  imageIds: function(key, value) {
    var ids;
    if (this.get('isNew')) {
      ids = arguments.length > 1 ? value : (localStorage.image_ids || "[]");
      return JSON.parse(ids);
    } else {
      if(arguments.length > 1) {
        ids = value;
        if(JSON.parse(value).length > 0) {
          this.set('item.imageIdentifiers', JSON.parse(value));
        }
      } else {
        ids = JSON.stringify(this.get('item.imageIdentifiers').split(','));
      }
      return (JSON.parse(ids || "[]"));
    }
  }.property("item.imageIdentifiers", "isNew"),

  favourite: function(key, value) {
    if (this.get('isNew')) {
      if(arguments.length > 1) {
        localStorage.favourite = value;
      }
      return localStorage.favourite;
    } else {
      if(arguments.length > 1) {
        this.set('item.favouriteImage', value);
      }
      return this.get('item.favouriteImage');
    }
  }.property("item.favouriteImage", "isNew"), //TODO observe localStorage http://stackoverflow.com/questions/14290316/observe-non-ember-globals

  imageCount: function() {
    return this.get('imageIds.length');
  }.property('imageIds.[]'),

  hasManyImages: function() {
    return this.get('imageCount') > 1;
  }.property('imageCount'),

  noImage: function() {
    return this.get('imageCount') === 0;
  }.property('imageCount'),

  addMoreImages: function(key, value) {
    return ( arguments.length > 1 ? value : this.get('noImage'));
  }.property('noImage'),

  actions: {

    setFavouriteImage: function(image_id) {
      this.set("favourite", image_id);
    },

    removeImage: function(image_id) {
      if (this.get('isNew')) {
        var uploaded = JSON.parse(localStorage.image_ids || "[]");
        uploaded.removeObject(image_id);
        localStorage.image_ids = JSON.stringify(uploaded);
        this.get("imageIds").removeObject(image_id);

        if(localStorage.favourite === image_id){
          this.set("favourite", this.get("imageIds.firstObject") || "");
        }
      } else {
        var image_array = this.get("imageIds")|| [];
        image_array.removeObject(image_id);
        this.set("imageIds", JSON.stringify(image_array));
        if(this.get("favourite") === image_id){
          this.set("favourite", this.get("imageIds.firstObject") || "");
        }
      }
    },

    updatePreview: function(image_id){
      if (this.get('isNew')) {
        if(JSON.parse(localStorage.image_ids|| "[]").length === 0) {
          this.set("favourite", image_id);
        }

        var uploaded = JSON.parse(localStorage.image_ids || "[]");
        uploaded.push(image_id);
        localStorage.image_ids = JSON.stringify(uploaded);
        this.get("imageIds").unshiftObject(image_id);
      } else {
        var image_array = this.get("imageIds")|| [];
        if(image_array.length === 0) {
          this.set("favourite", image_id);
        }

        image_array.unshiftObject(image_id);
        this.set("imageIds", JSON.stringify(image_array));
      }
    },

    setMoreImages: function() {
      this.set("addMoreImages", true);
    },

  },

  didInsertElement: function() {
    var controller = this;
    if (this.get('isNew')) {
      Ember.$('body').on('click', ".current_image", function() {
        if(/new/i.test(window.location.pathname)) {
          var public_id = Ember.$(this).attr('id');
          controller.set("previewImageId", public_id);
        }
      });
    } else {
      Ember.$('body').on('click', ".current_image", function() {
        var public_id = Ember.$(this).attr('id');
        controller.set("previewImageId", public_id);
      });
    }
  },

  willDestroyElement: function() {
    Ember.$('body').off('click', '.current_image');
  }

});
