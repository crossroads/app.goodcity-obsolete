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

  renderTemplate: function() {
    this.render(); // default template
    if(this.controllerFor('application').get("isLoggedIn")){
      this.render('notifications', {   // the template to render
        into: 'application',      // the template to render into
        outlet: 'notifications', // the name of the outlet in that template
        controller: 'notifications'   // the controller to use for the template
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
