import Ember from 'ember';

var SessionRoute = Ember.Route.extend({
  beforeModel: function() {
    if (this.controllerFor('application').get('isLoggedIn')) {
      var permissions = JSON.parse(localStorage.permissions);

      if(permissions['isReviewer'] || permissions['isSupervisor']) {
        this.transitionTo('/inbox');
      } else {
        this.transitionTo('/offers');
      }
    }
  }
});

export default SessionRoute;
