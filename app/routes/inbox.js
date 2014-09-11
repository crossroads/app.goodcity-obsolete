import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  beforeModel: function(){
    if (!this.controllerFor('application').get('isReviewer')) {
      this.transitionTo('offers');
    }
    return true;
  },

  model: function() {
    this.store.find('offer', {state: 'submitted'});
    return this.store.all('offer');
    // return this.store.find('offer', {state: 'submitted'});
  }
});
