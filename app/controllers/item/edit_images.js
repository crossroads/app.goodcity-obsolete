import Ember from "ember";
import "../../computed/ternary";

export default Ember.ObjectController.extend({
  needs: ["offer"],
  noImage: Ember.computed.empty("images"),
  imagesSortKey: ["id"],
  images: Ember.computed.sort("model.images", "imagesSortKey"),
  previewImage: null,
  addPhotoLabel: "Add Photo",
  isReady: false,
  isExpanded: false,

  favouriteImage: function() {
    return this.get("images").filterBy("favourite").get("firstObject");
  }.property("images.@each.favourite"),

  initPreviewImage: function() {
    var image = this.get("defaultImage");
    if (image) {
      this.send("setPreview", image);
    }
  }.observes("model"),

  //css related
  faStarClass: Ember.computed.ternary("previewImage.favourite", "fa-star", "fa-star-o"),
  faExpandClass: Ember.computed.ternary("isExpanded", "fa-compress", "fa-expand"),

  previewImageBgCss: function() {
    if (this.get("isExpanded")) {
      return "";
    }
    return "background-image:url(" + this.get("previewImage.imageUrl") + ")";
  }.property("previewImage", "isExpanded"),

  thumbImageCss: function() {
    var imgWidth = Math.min(120, Ember.$(window).width() / 4 - 6 * 4);
    return "width:" + imgWidth + "px; height:" + imgWidth + "px";
  }.property(),

  actions: {
    next: function() {
      this.transitionToRoute("item.edit");
    },

    back: function() {
      this.transitionToRoute("offer");
    },

    setPreview: function(image) {
      this.get("images").setEach("selected", false);
      image.set("selected", true);
      this.set("previewImage", image);
    },

    setFavourite: function() {
      this.get("images").setEach("favourite", false);
      this.get("previewImage").set("favourite", true).save();
    },

    deleteImage: function() {
      var _this = this;
      if (window.confirm("Are you sure you want to delete this image?")) {
        this.get("previewImage").destroyRecord().then(function() {
          _this.initPreviewImage();
        });
      }
    },

    expandImage: function() {
      var value = this.get("isExpanded");
      this.set("isExpanded", !value);
    },

    //file upload
    triggerUpload: function() {
      Ember.$("#photo-list input[type='file']").click();
    },

    uploadReady: function() {
      this.set("isReady", true);
    },

    uploadProgress: function(e, data) {
      var progress = parseInt(data.loaded / data.total * 100, 10);
      this.set("addPhotoLabel", progress + "%");
    },

    uploadComplete: function() {
      this.set("addPhotoLabel", "Add Photo");
    },

    uploadSuccess: function(e, data) {
      var identifier = data.result.version + "/" + data.result.public_id + "." + data.result.format;
      var _this = this;
      if (this.get("noImage")) {
        var offer = this.get("controllers.offer.model");
        var defaultDonorCondition = this.store.all("donorCondition").sortBy("id").get("firstObject");
        var item = this.store.createRecord("item", {offer:offer,donorCondition:defaultDonorCondition});
        item.save().then(function() {
          _this.store.createRecord('image', {cloudinaryId: identifier, item: item, favourite: true})
            .save().then(function() { _this.transitionToRoute("item.edit_images", item.get("id")); });
        });
      } else {
        _this.store.createRecord('image', {cloudinaryId: identifier, item: _this.get("model")}).save();
      }
    }
  }
});
