import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,

  renderTemplate: function() {
    this.render('inbox.index', {controller: 'inbox.my_list'});
  },

  model: function() {
    var currentUser = this.get('session.currentUser');
    return this.store.filter('offer', function(offer) {
        return offer.get('reviewedBy') === currentUser;
    });
  }
});
