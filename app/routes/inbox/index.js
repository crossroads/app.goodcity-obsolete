import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,

  model: function() {
    return this.store.filter('offer', {state: 'submitted'}, function(offer) {
      return offer.get('state') === 'submitted';
    });
  }
});
