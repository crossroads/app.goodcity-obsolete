import Ember from 'ember';

export default Ember.Component.extend({

  donorConditions: function() {
    var store = this.get('targetObject.store');
    return store.find('donor_condition');
    //~ .then( function(objs) {
      //~ return objs.sortBy('id');
    //~ })
  }.property('donor_condition.[]'),

});
