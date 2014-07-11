import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: GoodcityENV.APP.NAMESPACE,
  host:      GoodcityENV.APP.HOST
});
