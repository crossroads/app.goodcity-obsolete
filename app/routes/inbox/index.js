import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  beforeModel: function(){
    this._super();
    var isDonor = this.controllerFor('authorize').get('isDonor');
    if (isDonor) {
      this.transitionTo('offers');
    }
    return true;
  },

  model: function() {
    return this.store.filter('offer', {state: 'submitted'}, function(offer) {
      return offer.get('state') === 'submitted';
    });
  }
});
