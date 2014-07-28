import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  namespace: GoodcityENV.APP.NAMESPACE,
  host:      GoodcityENV.APP.API_HOST_URL,
  headers: {
    "Authorization":  'Bearer ' + localStorage.jwt,
    "Accept-Language": Ember.I18n.translations.language
  }
});
