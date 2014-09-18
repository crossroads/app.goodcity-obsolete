import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  beforeModel: function(){
    //~ if (!this.controllerFor('application').get('isReviewer')) {
      //~ this.transitionTo('offers');
    //~ }
    return true;
  },

  model: function() {
    return this.store.filter('offer', {state: 'submitted'}, function(offer) {
        return offer.get('state') == 'submitted';
    });
  }
});
