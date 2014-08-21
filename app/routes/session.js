import Ember from 'ember';

var SessionRoute = Ember.Route.extend({
  beforeModel: function() {
    if (this.controllerFor('application').get('isLoggedIn')) {
      this.transitionTo('/offers');
    }
  }
});

export default SessionRoute;
