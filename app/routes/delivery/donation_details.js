import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  model: function() {
    var deliveryId = this.modelFor('delivery').get('id');
    return this.store.getById('delivery', deliveryId);
  }

});
