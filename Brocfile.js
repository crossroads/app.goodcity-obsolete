/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var app = new EmberApp();
app.import('vendor/cloudinary/js/jquery.cloudinary.js');
app.import({
  development: 'vendor/ember-data/ember-data.js',
  production:  'vendor/ember-data/ember-data.prod.js'
  }, { exports: {
        'ember-data': ['default']
      }
});
module.exports = app.toTree();
