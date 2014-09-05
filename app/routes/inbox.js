import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({

  model: function() {
    return this.store.find('offer', {state: 'submitted'});
  }
});
