import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var offer = this.store.createRecord('offer', {
      state: 'draft'
    });
    var route = this;
    offer.save().then(function(){
      route.transitionTo('offer', offer.id);
    });
  }
});
