import Ember from 'ember';

var AuthorizeRoute =  Ember.Route.extend({
  staffRestricted: false,

  beforeModel: function(transition) {
    if (!this.controllerFor('application').get('isLoggedIn')) {
      alert('You must log in!');
      var loginController = this.controllerFor('login');
      loginController.set('attemptedTransition', transition);
      this.transitionTo('login');
    }

    if (this.get('staffRestricted') && !this.get('session.currentUser.isStaff')) {
      this.transitionTo('offers');
    }
  },

  actions: {
    error: function(reason) {
      if (reason.status === 401) {
        if (reason.responseJSON.error === "Expired token") {
          this.controllerFor('application').send('logMeOut');
        }
        else {
          this.transitionTo('login');
        }
      } else {
        alert('Something went wrong');
        console.log(reason);
      }
    }
  }
});

export default AuthorizeRoute;
