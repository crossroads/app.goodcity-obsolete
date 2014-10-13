import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate: function() {
    this.render('inbox.index', {controller: 'inbox.under_review'});
  },

  beforeModel: function(){
    this._super();
    if (this.get('session.currentUser.isDonor')) {
      this.transitionTo('offers');
    }
    return true;
  },

  model: function() {
    return this.store.filter('offer', {state: 'under_review'}, function(offer) {
        return offer.get('state') === 'under_review';
    });
  }
});
