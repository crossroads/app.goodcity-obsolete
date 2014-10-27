import Ember from 'ember';

// {{upload-images item=this back="back" next="next"  updateItem="updateItem"}}

export default Ember.Component.extend({

  isNew: function() {
    var item = this.get('item');
    return !(item && item.get('isNew') === false);
  }.property('item.isNew'),

  requireImageAtEdit: function() {
    return (this.get('hasManyImages') || this.get('isNew'));
  }.property('hasManyImages', 'isNew'),

  previewImageId: function(key, value) {
    return (arguments.length > 1 ? value : this.get("favourite"));
  }.property('favourite', 'imageIds.[]'),

  imageIds: function(key, value) {
    var ids;
    if (this.get('isNew')) {
      ids = arguments.length > 1 ? value : (localStorage.image_ids || "[]");
      return JSON.parse(ids);
    } else {
      if(arguments.length > 1) {
        ids = value;
        this.set('item.imageIdentifiers', JSON.parse(value).join(','));
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
      if(!this.get('isNew')) { this.sendAction('updateItem'); }
      return true;
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
        this.sendAction('updateItem');
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
        this.sendAction('updateItem');
      }

      this.send('setPreviewImageId', image_id);
    },

    setMoreImages: function() {
      this.set("addMoreImages", true);
    },

    setPreviewImageId: function(image_id) {
      this.set("previewImageId", image_id);
    },

    next: function() {
      this.sendAction('next');
    },

    back: function() {
      this.sendAction('back');
    }
  }
});
