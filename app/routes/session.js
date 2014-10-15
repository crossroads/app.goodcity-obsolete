import Ember from 'ember';

var SessionRoute = Ember.Route.extend({
  beforeModel: function() {
    if (this.controllerFor('application').get('isLoggedIn')) {
      if (this.get('session.currentUser.isStaff')) {
        this.transitionTo('/inbox');
      } else {
        this.transitionTo('/offers');
      }
    }
  }
});

export default SessionRoute;
