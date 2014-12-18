import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  model: function() {
    var offerId = this.modelFor('offer').get('id');

    return this.store.filter('item', function(item) {
      return item.get('offer.id') === offerId;
    });
  }
});
