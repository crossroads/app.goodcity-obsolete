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

  renderTemplate: function() {
    this.render(); // default template
    if(this.controllerFor('application').get("isLoggedIn")){
      this.render('messages/unread', {   // the template to render
        into: 'application',      // the template to render into
        outlet: 'unreadMessages', // the name of the outlet in that template
        controller: 'messages/unread'   // the controller to use for the template
      });

      this.render('messages/unreadMessageCount', {
        into: 'application',
        outlet: 'unreadMessageCount',
        controller: 'messages/unread'
      });
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
