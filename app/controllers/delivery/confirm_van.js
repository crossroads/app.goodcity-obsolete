import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['delivery'],

  user: Ember.computed.alias('session.currentUser'),
  orderDetails: Ember.computed.alias('model'),

  actions: {
    confirmOrder: function(){
      var controller = this;
      // address details
      var district = controller.store.getById("district", controller.get('orderDetails.districtId'));
      var addressProperties = {addressType: 'collection',
        district: district};

      // contact details
      var contactProperties = { name: Ember.$("#userName").val(), mobile: Ember.$("#mobile").val() };
      var contact = controller.store.createRecord('contact', contactProperties);

      // schedule details
      var scheduleProperties = { scheduledAt: controller.get('orderDetails.pickupTime'), slotName: controller.get('orderDetails.slot') };
      var schedule = controller.store.createRecord('schedule', scheduleProperties);

      var delivery = controller.store.getById("delivery", controller.get('controllers.delivery.id'));

      // save schedule
      schedule.save().then(function(schedule) {
        delivery.set('schedule', schedule);

        // save contact
        contact.save().then(function(contact) {
          addressProperties.addressable = contact;
          var address = controller.store.createRecord('address', addressProperties);

          //save address
          address.save().then(function() {
            delivery.set('contact', contact);
            controller.get('orderDetails').save().then(function(gogovan_order){
              delivery.set('gogovanOrder', gogovan_order);

              // save delivery
              delivery.save().then(function() {
                controller.transitionToRoute('delivery.donation_details');
              });
            })
            .catch(function() {
              alert("There is some error with your bookings. Please try again later.");
              controller.transitionToRoute('delivery.book_van');
            });
          });
        });
      });
    }
  }
});
