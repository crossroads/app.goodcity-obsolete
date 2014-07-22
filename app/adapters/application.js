import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: GoodcityENV.APP.NAMESPACE,
  host:      GoodcityENV.APP.API_HOST_URL,
  headers: {
    "Authorization":  'Bearer ' + localStorage.jwt
  }
});
