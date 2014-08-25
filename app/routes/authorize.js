import Ember from 'ember';

var AuthorizeRoute =  Ember.Route.extend({
  beforeModel: function(transition) {
    if (!this.controllerFor('application').get('isLoggedIn')) {
      this.redirectToLogin(transition);
    }
  },

  redirectToLogin: function(transition) {
    alert('You must log in!');
    var loginController = this.controllerFor('login');
    loginController.set('attemptedTransition', transition);
    this.transitionTo('login');
  },

  actions: {
    error: function(reason) {
      if (reason.status === 401) {
        this.transitionTo('login');
      } else {
        alert('Something went wrong');
      }
    }
  }
});

export default AuthorizeRoute;
