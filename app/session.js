import Ember from 'ember';
import './computed/local-storage';

export default Ember.Object.extend({
  authToken: Ember.computed.localStorage(),
  otpAuthKey: Ember.computed.localStorage(),
  currentUserId: Ember.computed.localStorage(),

  currentUser: function() {
    if (!this.get('currentUserId')) {
      return null;
    }
    var store = this.container.lookup('store:main');
    return store.getById('user', this.get('currentUserId'));
  }.property('currentUserId'),

  clear: function() {
    this.set("authToken", null);
    this.set("otpAuthKey", null);
    this.set('currentUserId', null);
  }
});
