/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('bower_components/cloudinary/js/jquery.ui.widget.js');
app.import('bower_components/cloudinary/js/jquery.iframe-transport.js');
app.import('bower_components/cloudinary/js/jquery.fileupload.js');
app.import('bower_components/cloudinary/js/load-image.min.js');
app.import('bower_components/cloudinary/js/canvas-to-blob.min.js');
app.import('bower_components/cloudinary/js/jquery.fileupload-process.js');
app.import('bower_components/cloudinary/js/jquery.fileupload-image.js');
app.import('bower_components/cloudinary/js/jquery.fileupload-validate.js');
app.import('bower_components/cloudinary/js/jquery.cloudinary.js');
app.import('bower_components/moment/moment.js');

app.import('bower_components/fastclick/lib/fastclick.js');
app.import('bower_components/foundation/js/foundation.min.js');
app.import('bower_components/jquery-placeholder/jquery.placeholder.js');
app.import('bower_components/jquery.cookie/jquery.cookie.js');
app.import('bower_components/modernizr/modernizr.js');

app.import({
  development: 'vendor/pusher.js',
  test: 'vendor/pusher-test-stub.js'
});
app.import('vendor/ember-pusher.js');
app.import('bower_components/jquery-timeago/jquery.timeago.js');

//~ For the moment, ember-18n requires full version of handlebars.
//~ This is being removed, see https://github.com/jamesarosen/ember-i18n/pull/114
app.import({
  development: 'bower_components/handlebars/handlebars.js',
  production:  'bower_components/handlebars/handlebars.js'
});
app.import('bower_components/ember-i18n/lib/i18n.js');
app.import('bower_components/ember-i18n/lib/i18n-plurals.js');

app.import({
  development: 'bower_components/ember-data/ember-data.js',
  production:  'bower_components/ember-data/ember-data.prod.js'
  }, { exports: {
        'ember-data': ['default']
      }
});
app.import({
  development: 'bower_components/ember-data-factory-guy/dist/ember-data-factory-guy.js',
  test: 'bower_components/ember-data-factory-guy/dist/ember-data-factory-guy.js'
  }, {  destDir: 'assets/',
      exports: {
        'FactoryGuy': ['default']
  }
});

app.import({
  development: 'bower_components/ember-data-factory-guy/dist/factory_guy_has_many.js',
  test: 'bower_components/ember-data-factory-guy/dist/factory_guy_has_many.js',
  }, {  destDir: 'assets/',
      exports: {
        'FactoryGuyHasMany': ['default']
  }
});

module.exports = app.toTree();
