import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(fieldname, resourceType, cloudinaryTagName, tag){
    return (Ember.$.cloudinary.uploader.image_upload_tag(fieldname, {
    // callback: cloudinary_cors,
    // tags: tag,
    resource_type: resourceType
    }));
});
