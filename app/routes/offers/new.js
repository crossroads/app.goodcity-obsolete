import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var offer = this.store.createRecord('offer');
    var route = this;
    offer.save().then(function(){
      route.transitionTo('offer', offer.id)
    });
  }
});
