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
  disabled: true,
  attributeBindings: [ "name", "type", "value", "class", "data-cloudinary-field",
    "data-url", "data-form-data", "disabled"],

  _initialze: function(){
    var component = this;
    var options = {
      dropZone: Ember.$('.sceneUpBtn'),
      dataType: 'json',
      timeout: 60000,// 1 minute

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
      },

      fail: function(e, data) {
        console.log("error " + data.errorThrown);
        Ember.$(".loading_image").hide();
        alert(Ember.I18n.t('upload-image.upload_error'));
      }
    };

    Ember.$.ajax({
      type: 'GET',
      url: config.APP.SERVER_PATH +"/images/generate_signature",
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.get('session.authToken')
      },
      success: function(data){
        Ember.run(function() {
          Ember.$('.cloudinary-fileupload')
            .attr("data-form-data", JSON.stringify(data))
            .cloudinary_fileupload(options);
          component.set('disabled', false);
        });
      }
    });
  }.on('didInsertElement')

});
