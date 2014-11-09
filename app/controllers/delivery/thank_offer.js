import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['delivery'],

  contact: function() {
    var deliveryId = this.get('controllers.delivery.id');
    return this.store.getById('delivery', deliveryId);
  }.property(),

  actions:{
    done: function(){
      this.transitionToRoute('offers.index');
    }
  }
});
