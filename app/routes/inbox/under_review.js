import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,

  renderTemplate: function() {
    this.render('inbox.index', {controller: 'inbox.under_review'});
  },

  model: function() {
    return this.store.filter('offer', {state: 'under_review'}, function(offer) {
        return offer.get('state') === 'under_review';
    });
  }
});
