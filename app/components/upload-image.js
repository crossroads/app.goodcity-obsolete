import Ember from "ember";

export default Ember.Component.extend({
  tagName: "input",
  type:    "file",
  accept:  "image/*",
  name:    "file",
  classNames: ["cloudinary-fileupload"],
  "data-cloudinary-field": "image_upload",
  "data-url": GoodcityENV.APP.CLOUD_URL,
  attributeBindings: [ "name", "type", "value", "class", "data-cloudinary-field", "data-url", "data-form-data"],

  click: function() {
    var component = this;

    Ember.$('.cloudinary-fileupload').cloudinary_fileupload({
      dropZone: Ember.$('.sceneUpBtn'),
      dataType: 'json',

      done: function (e, data) {
        console.log("done");

        Ember.$(".loading_image").hide();

        var identifier = data.result.version + "/" + data.result.public_id + "." + data.result.format;
        // var ids = Ember.$("#images_identifiers").val();
        // ids = (ids === "" ? identifier : (ids + "," + identifier));
        // Ember.$("#images_identifiers").val(ids);

        component.sendAction('action', identifier);
        Ember.$(".add_item_link").removeAttr("disabled");
      },

      progressall: function (e, data) {
        console.log("progress");
        Ember.$(".loading_image").show();
        var progress = parseInt(data.loaded / data.total * 100, 10);
        Ember.$('.progress').html(progress + '%');
      }
    });
  },

  _initialze: function(){
    console.log("init");
    Ember.$.get(GoodcityENV.APP.SERVER_PATH +"/images/generate_signature").done(function(data){
      Ember.$('.cloudinary-fileupload').attr("data-form-data", JSON.stringify(data));
    });
  }.on('didInsertElement')

});
