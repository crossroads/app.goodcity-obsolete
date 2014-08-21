import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  actions: {
    back: function() {
      this.transitionTo('offer');
    }
  }
});
