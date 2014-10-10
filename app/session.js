import Ember from 'ember';
import './computed/localstorage';

export default Ember.Object.extend({
  authToken: Ember.computed.localStorage()
});
