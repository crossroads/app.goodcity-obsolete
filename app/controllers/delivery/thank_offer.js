import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['delivery'],

  contact: function(key, value) {
    if(arguments.length > 1) {
      return value;
    } else {
      var deliveryId = this.get('controllers.delivery.id');
      return this.store.getById('delivery', deliveryId);
    }
  }.property(),

  actions:{
    done: function(){
      this.transitionToRoute('offers.index');
    }
  }
});
