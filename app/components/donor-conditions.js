import Ember from 'ember';

export default Ember.Component.extend({

  donorConditions: function(key, value) {

    if (arguments.length > 1) {
      return value;
    } else {

      var sortConditions, _this = this;
      var store = this.get('targetObject.store');

      store.find('donor_condition').then( function(objs) {
        sortConditions = objs.sortBy('id');
        _this.set("donorConditions", sortConditions);
        value = sortConditions;
      });
      return value;
    }
  }.property('donor_condition.[]')

});
