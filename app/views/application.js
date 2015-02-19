import Init from './init';
import Ember from 'ember';

export default Init.extend({
  didInsertElement: function() {
    var view = this;
    window.addEventListener('online',  view.updateOnlineStatus);
    window.addEventListener('offline', view.updateOnlineStatus);
  },

  updateOnlineStatus: function() {
    var status = Ember.$("#status");
    if(!navigator.onLine) {
      status.removeClass("online").addClass("offline");
      status.text("Attempting to connect to app.goodcity.hk...");
    } else {
      status.removeClass("offline").addClass("online");
    }
  },

});
