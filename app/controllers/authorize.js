import Ember from 'ember';

export default Ember.Controller.extend({

  isDonor: function(key, value) {
    if (arguments.length > 1) {
      var permissions_object = JSON.parse(localStorage.permissions ? localStorage.permissions : "{}");
      permissions_object[key] = value;
      localStorage.permissions = JSON.stringify(permissions_object);
    }
    return JSON.parse(localStorage.permissions)['isDonor'];
  }.property(),

  isReviewer: function(key, value) {
    var permissions_object = JSON.parse(localStorage.permissions);
    if (arguments.length > 1) {
      permissions_object['isReviewer'] = value;
      localStorage.permissions = permissions_object;
    }
    return permissions_object['isReviewer'];
  }.property(),

  isSupervisor: function(key, value) {
    var permissions_object = JSON.parse(localStorage.permissions);
    if (arguments.length > 1) {
      permissions_object['isSupervisor'] = value;
      localStorage.permissions = permissions_object;
    }
    return permissions_object['isSupervisor'];
  }.property(),

   actions: {
     setPermissions: function(user) {
       this.set('isDonor', user.get('isDonor'));
       this.set('isReviewer', user.get('isReviewer'));
       this.set('isSupervisor', user.get('isSupervisor'));
     }
   }
});
