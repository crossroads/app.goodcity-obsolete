import DS from 'ember-data';
import Ember from 'ember';

var Adapter;

if(window.GoodcityENV.environment === "test") {
  Adapter = DS.RESTAdapter.extend();
} else {
  Adapter = DS.RESTAdapter.extend({
    namespace: GoodcityENV.APP.NAMESPACE,
    host:      GoodcityENV.APP.API_HOST_URL,
    headers: {
      "Authorization":  'Bearer ' + localStorage.jwt,
      "Accept-Language": Ember.I18n.translations.language
    }
  });
}

export default Adapter;
