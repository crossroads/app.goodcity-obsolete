import Ember from 'ember';
import './computed/local-storage';

export default Ember.Object.extend({
  authToken: Ember.computed.localStorage(),
  otpAuthKey: Ember.computed.localStorage()
});
