/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'goodcity',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true

        I18N_TRANSLATE_HELPER_SPAN: false //switch to future version default to suppress warning
      },
      I18N_COMPILE_WITHOUT_HANDLEBARS: true //switch to future version default to suppress warning
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created

      // Cloudinary Keys
      CLOUD_NAME: 'ddoadcjjl',
      CLOUD_API_KEY: 926849638736153,
      CLOUD_URL: 'https://api.cloudinary.com/v1_1/ddoadcjjl/auto/upload',
      IMAGE_PATH: 'http://res.cloudinary.com/ddoadcjjl/image/upload/',
      HK_COUNTRY_CODE: '+852',
      PUSHER_API_KEY: 'ef16f3c0f3a2f14f5498',
      // RESTAdapter Settings
      NAMESPACE: 'api/v1',
    }
  };

  if (environment === 'development') {
    ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;

    // RESTAdapter Settings
    ENV.APP.API_HOST_URL = 'http://localhost:3000';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    // RESTAdapter Settings
    ENV.APP.API_HOST_URL = 'http://api.goodcity.hk';
  }

  return ENV;
};
