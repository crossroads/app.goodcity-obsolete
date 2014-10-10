import Ember from 'ember';
import './computed/storage';

export default Ember.Object.extend({
  authToken: Ember.computed.localStorage()
});
