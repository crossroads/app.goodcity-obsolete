import Ember from 'ember';

var AuthorizeRoute =  Ember.Route.extend({
  // beforeModel: function(transition) {
  //   // var adapter = this.get('container').lookup('adapter:auth');
  //   // adapter.set('headers', { 'Authorization': 'Bearer ' + localStorage.step1_token });
  //   console.log(this.controllerFor('application').get('isLoggedIn'));
  //   if (this.controllerFor('application').get('isLoggedIn') === false) {
  //     console.log(localStorage.jwt);
  //     console.log(localStorage.step1_token);
  //     console.log("transition - " + transition);
  //     this.redirectToLogin(transition);
  //   }
  // },

  // redirectToLogin: function(transition) {
  //   // alert('You must log in!');
  //   console.log(!this.controllerFor('application').get('isLoggedIn'));
  //   console.log('You must log in!');
  //   var loginController = this.controllerFor('login');
  //   loginController.set('attemptedTransition', transition);
  //   this.transitionTo('login');
  // },

  // actions: {
  //   error: function(reason, transition) {
  //     if (reason.status === 401) {
  //       this.redirectToLogin(transition);
  //     } else {
  //       alert('Something went wrong');
  //     }
  //   }
  // }
});

export default AuthorizeRoute;
