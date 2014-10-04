import './computed/storage';

export default Ember.Object.extend({
  authToken: Ember.computed.storage()
});
