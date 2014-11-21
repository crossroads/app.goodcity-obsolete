import Ember from 'ember';

export default Ember.computed.ternary = function(key, trueValue, falseValue) {
  return Ember.computed(key, function() {
    return this.get(key) ? trueValue : falseValue;
  });
};
