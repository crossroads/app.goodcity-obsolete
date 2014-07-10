import Ember from "ember";

export default Ember.Component.extend({
  tagName: "input",
  type:    "file",
  accept:  "image/*",
  name:    "file",
  classNames: ["cloudinary-fileupload"],
  "data-cloudinary-field": "image_upload",
  "data-url": "https://api.cloudinary.com/v1_1/kiprosh/auto/upload",
  attributeBindings: [ "name", "type", "value", "class", "data-cloudinary-field", "data-url", "data-form-data"],
  click: function() {
    $('.cloudinary-fileupload').cloudinary_fileupload({
      dropZone: $('.sceneUpBtn'),
      dataType: 'json',
      done: function (e, data) {
        console.log("done");
        $(".loading_image").hide();
        $('ul.file_names').append("<img src='"+data.result.url+"'></img>");
      },
      progressall: function (e, data) {
        console.log("progress");
        $(".loading_image").show();
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('.progress').html(progress + '%');
      }
    });
  },

  _initialze: function(){
    console.log("init");
    $.get('http://localhost:3000/api/v1/generate_signature').done(function(data){
      $('.cloudinary-fileupload').attr("data-form-data", JSON.stringify(data));
    });
  }.on('didInsertElement')

});
