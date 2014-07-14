/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // LOG_MODULE_RESOLVER is needed for pre-1.6.0
    ENV.LOG_MODULE_RESOLVER = true;

    ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_MODULE_RESOLVER = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;

    // Cloudinary Keys
    ENV.APP.CLOUD_NAME = 'ddoadcjjl';
    ENV.APP.CLOUD_API_KEY = 926849638736153;
    ENV.APP.CLOUD_URL = 'https://api.cloudinary.com/v1_1/ddoadcjjl/auto/upload';

    // RESTAdapter Settings
    ENV.APP.NAMESPACE = 'api/v1';
    ENV.APP.HOST      = 'http://localhost:3000/';
    ENV.APP.SERVER_PATH = ENV.APP.HOST + ENV.APP.NAMESPACE;
  }

  if (environment === 'production') {

  }

  return ENV;
};
