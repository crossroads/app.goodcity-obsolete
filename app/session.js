import Ember from 'ember';
import './computed/local-storage';

export default Ember.Object.extend({
  authToken: Ember.computed.localStorage(),
  otpAuthKey: Ember.computed.localStorage(),
  currentUserId: Ember.computed.localStorage(),

  currentUser: function() {
    var store = this.container.lookup('store:main');
    return store.findById('user', this.get('currentUserId'));
  }.property('currentUserId')
});
