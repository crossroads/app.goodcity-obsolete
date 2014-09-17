import DS from 'ember-data';
import Ember from 'ember';

var Adapter;

if(window.GoodcityENV.environment === "test") {
  Adapter = DS.ActiveModelAdapter.extend({
    namespace: GoodcityENV.APP.NAMESPACE,
    headers: function() {
      var authtoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0MDkwMzgzNjUsImlzcyI6Ikdvb2RDaXR5SEsiLCJleHAiOjE0MTAyNDc5NjUsIm1vYmlsZSI6Iis4NTI2MTA5MjAwMSIsIm90cF9zZWNyZXRfa2V5IjoiemRycGZ4c2VnM3cyeWt2aSJ9.lZQaME1oKw7E5cdfks0jG3A_gxlOZ7VfUVG4IMJbc08";
      return {
        "Authorization":  'Bearer ' + (authtoken || localStorage.jwt),
        "Accept-Language": Ember.I18n.translations.language
      };
    }.property("Goodcity.authToken")
  });
} else {
  Adapter = DS.ActiveModelAdapter.extend({
    namespace: GoodcityENV.APP.NAMESPACE,
    host:      GoodcityENV.APP.API_HOST_URL,
    headers: function() {
      return {
        "Authorization":  'Bearer ' + (window.Goodcity.get('authToken') || localStorage.jwt),
        "Accept-Language": Ember.I18n.translations.language
      };
    }.property("Goodcity.authToken"),

    ajaxError: function(jqXHR){
      if (jqXHR && jqXHR.status === 500) {
        alert("Server Error. Please try again later.");
      }
      this._super(jqXHR);
    }
  });
}

export default Adapter;
