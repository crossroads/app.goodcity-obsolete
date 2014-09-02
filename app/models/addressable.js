import DS from 'ember-data';

var belongsTo = DS.belongsTo;

var Addressable = DS.Model.extend({
  address: belongsTo('address')
});

export default Addressable;
