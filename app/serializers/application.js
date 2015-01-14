import DS from 'ember-data';

// Polymorphic associations are not supported in ember-data beta version:
// refer: https://github.com/emberjs/data/issues/1574

export default DS.ActiveModelSerializer.extend({
  extractSingle: function(store, type, payload, id, requestType) {
    if (payload.address) {
      payload.address.addressable     = payload.address.addressable_id;
      payload.address.addressableType = payload.address.addressable_type;
    }

    if (payload.addresses) {
      payload.addresses.forEach(function(address) {
        address.addressable     = address.addressable_id;
        address.addressableType = address.addressable_type;
      });
    }

    return this._super(store, type, payload, id, requestType);
  },
  extractArray: function(store, type, payload, id, requestType) {
    if (payload.addresses) {
      payload.addresses.forEach(function(address) {
        address.addressable     = address.addressable_id;
        address.addressableType = address.addressable_type;
      });
    }

    return this._super(store, type, payload, id, requestType);
  }
});
