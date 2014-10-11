import Ember from 'ember';
import Application from '../../app';
import Router from '../../router';
import config from '../../config/environment';
import './custom-helpers';

export default function startApp(attrs) {
  var App;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Router.reopen({
    location: 'none'
  });

  Ember.run(function() {
    App = Application.create(attributes);
    App.setupForTesting();
    App.injectTestHelpers();
  });

  //auth
  window.localStorage.authToken = '"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0MDkwMzgzNjUsImlzcyI6Ikdvb2RDaXR5SEsiLCJleHAiOjE0MTAyNDc5NjUsIm1vYmlsZSI6Iis4NTI2MTA5MjAwMSIsIm90cF9zZWNyZXRfa2V5IjoiemRycGZ4c2VnM3cyeWt2aSJ9.lZQaME1oKw7E5cdfks0jG3A_gxlOZ7VfUVG4IMJbc08"';
  window.localStorage.permissions = '{"isReviewer":false,"isSupervisor":false}';
  window.localStorage.currentUserId = '1';

  window.alert = function(message) { console.log("Alert: " + message); };

  //http://emberjs.com/guides/understanding-ember/debugging/#toc_errors-within-an-code-rsvp-promise-code
  Ember.RSVP.configure('error', function(e) {
    Ember.Logger.assert(false, e.message);
    console.log(e.stack);
  });

  //needed by application controller init
  lookup("controller:subscriptions").pusher = { wire: function() {} };

  App.reset(); // this shouldn't be needed, i want to be able to "start an app at a specific URL"

  return App;
}
