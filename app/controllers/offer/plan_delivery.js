import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ["offer"],

  offerId: Ember.computed.alias('controllers.offer.id'),

  offer: function(){
    return this.store.getById('offer', this.get('offerId'));
  }.property('offerId'),

  actions: {
    startDelivery: function(delivery_type) {
      var offerId = this.get('controllers.offer').get('id');
      var delivery = this.store.createRecord('delivery', {
        offer: this.store.getById('offer', offerId),
        deliveryType: delivery_type
      });

      var route = this;
      delivery.save().then(function(delivery) {
        switch(delivery_type) {
          case 'alternate':
            route.transitionToRoute('delivery.book_timeslot', delivery);
            break;
          case 'gogovan':
            route.transitionToRoute('delivery.book_van', delivery);
            break;
          case 'drop_off':
            route.transitionToRoute('delivery.drop_off_schedule', delivery);
            break;
        }
      });
    }
  }
});
