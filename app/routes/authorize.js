import Ember from 'ember';

var AuthorizeRoute =  Ember.Route.extend({
  beforeModel: function(transition) {
    if (!this.controllerFor('application').get('isLoggedIn')) {
      this.redirectToLogin(transition);
    }
  },

  afterModel: function(){
    var route = this;
    var currentUserId = route.controllerFor('application').get('currentUserId');
    if(currentUserId) {
      route.store.find('user', currentUserId).then(function(user){
        route.controllerFor('application').set('currentUser', user);
      });
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
    }
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
