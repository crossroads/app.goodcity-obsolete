import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'api/v1',
  host: GoodcityENV.APP.API_HOST_URL //defined in config/environment.js
});
