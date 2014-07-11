import Ember from "ember";

export default {
  name: 'cloudinary',
  initialize: function(/* container, app */ ) {
    Ember.$.cloudinary.config({
      'cloud_name': GoodcityENV.APP.CLOUD_NAME,
      'api_key':    GoodcityENV.APP.CLOUD_API_KEY
    });
  }
};
