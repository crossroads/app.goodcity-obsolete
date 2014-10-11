import Ember from 'ember';

var AuthorizeRoute =  Ember.Route.extend({
  allowAnonymous: false,
  staffRestricted: false,
  redirectIfLoggedIn: false,

  beforeModel: function(transition) {
    if (!this.get('allowAnonymous') && !this.controllerFor('application').get('isLoggedIn')) {
      alert('You must log in!');
      var loginController = this.controllerFor('login');
      loginController.set('attemptedTransition', transition);
      this.transitionTo('login');
    }

    if (this.get('staffRestricted') && !this.get('session.currentUser.isStaff')) {
      this.transitionTo('offers');
    }

    if (this.get('redirectIfLoggedIn') && this.controllerFor('application').get('isLoggedIn')) {
      if (this.get('session.currentUser.isStaff')) {
        this.transitionTo('/inbox');
      } else {
        this.transitionTo('/offers');
      }
    }
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
