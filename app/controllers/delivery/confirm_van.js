import Ember from 'ember';

export default Ember.ObjectController.extend({

  user: Ember.computed.alias('session.currentUser')

});
