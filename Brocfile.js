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

//~ For the moment, ember-18n requires full version of handlebars.
//~ This is being removed, see https://github.com/jamesarosen/ember-i18n/pull/114
app.import({
  development: 'vendor/handlebars/handlebars.js',
  production:  'vendor/handlebars/handlebars.js'
});
app.import('vendor/cldr/plurals.js');
app.import('vendor/ember-i18n/lib/i18n.js');

app.import({
  development: 'vendor/ember-data/ember-data.js',
  production:  'vendor/ember-data/ember-data.prod.js'
  }, { exports: {
        'ember-data': ['default']
      }
});
module.exports = app.toTree();
