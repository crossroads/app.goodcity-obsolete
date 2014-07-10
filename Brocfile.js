/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var app = new EmberApp();

app.import('vendor/cloudinary/js/jquery.ui.widget.js');
app.import('vendor/cloudinary/js/jquery.iframe-transport.js');
app.import('vendor/cloudinary/js/jquery.fileupload.js');
app.import('vendor/cloudinary/js/load-image.min.js');
app.import('vendor/cloudinary/js/canvas-to-blob.min.js');
app.import('vendor/cloudinary/js/jquery.fileupload-process.js');
app.import('vendor/cloudinary/js/jquery.fileupload-image.js');
app.import('vendor/cloudinary/js/jquery.fileupload-validate.js');
app.import('vendor/cloudinary/js/jquery.cloudinary.js');

app.import({
  development: 'vendor/ember-data/ember-data.js',
  production:  'vendor/ember-data/ember-data.prod.js'
  }, { exports: {
        'ember-data': ['default']
      }
});
module.exports = app.toTree();
