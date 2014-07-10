export default {
  name: 'cloudinary',
  initialize: function(/* container, app */ ) {
    Ember.$.cloudinary.config({'cloud_name': 'kiprosh',
      'api_key': 457459653293635});
  }
};
