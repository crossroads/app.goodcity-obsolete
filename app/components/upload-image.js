import Ember from "ember";
import config from '../config/environment';

export default Ember.Component.extend({
  tagName: "input",
  type:    "file",
  accept:  "image/*",
  name:    "file",
  classNames: ["cloudinary-fileupload"],
  "data-cloudinary-field": "image_upload",
  "data-url": config.APP.CLOUD_URL,
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
    Ember.$.ajax({
      type: 'GET',
      url: config.APP.SERVER_PATH +"/images/generate_signature",
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.get('session.authToken')
      },
      success: function(data){
        Ember.run(function() {
          Ember.$('.cloudinary-fileupload').attr("data-form-data", JSON.stringify(data));
        });
      }
    });
  }.on('didInsertElement')

});
