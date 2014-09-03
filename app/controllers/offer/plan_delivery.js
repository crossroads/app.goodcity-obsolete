import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ["offer"],

  actions: {
    startDelivery: function(delivery_type) {
      var offerId = this.get('controllers.offer').get('id');
      var delivery = this.store.createRecord('delivery', {
        offer: this.store.getById('offer', offerId),
        deliveryType: delivery_type
      });

      var route = this;
      delivery.save().then(function(delivery) {
        route.transitionToRoute('delivery.book_timeslot', delivery);
      });
    }
  }
});
