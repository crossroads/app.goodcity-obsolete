import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,

  model: function() {
    var offerId = this.modelFor('offer').get('id');

    return this.store.filter('item', function(item) {
      return item.get('offer.id') === offerId && item.get("state") !== "draft";
    });
  }
});
