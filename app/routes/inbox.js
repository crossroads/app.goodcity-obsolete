import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  beforeModel: function(){
    var isDonor = this.controllerFor('application').get('currentUser.isDonor');
    if (isDonor) {
      this.transitionTo('offers');
    }
    this._super();
    return true;
  },

  model: function() {
    return this.store.filter('offer', {state: 'submitted'}, function(offer) {
        return offer.get('state') == 'submitted';
    });
  }
});
