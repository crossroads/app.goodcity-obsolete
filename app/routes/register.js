import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  allowAnonymous: true,
  redirectIfLoggedIn: true,

  model: function() {
    return this.store.find('territory');
  }
});
