import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  controllerName: 'authenticate',
  allowAnonymous: true,
  redirectIfLoggedIn: true
});
