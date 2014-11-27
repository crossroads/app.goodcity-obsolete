import Ember from 'ember';
import config from './../../config/environment';

export default Ember.ObjectController.extend({
  needs: ['delivery'],

  user: Ember.computed.alias('session.currentUser'),
  mobileNumber: Ember.computed.alias('user.mobile'),
  orderDetails: Ember.computed.alias('model'),

  validMobile: Ember.computed.equal("mobileNumber.length", 8),

  districtName: function(){
    var district = this.store.getById("district", this.get('districtId'));
    return district.get('name');
  }.property(),

  inProgress: function(key,value) {
    return (arguments.length > 1) ? value : false;
  }.property(),

  invalidName: function(key, value) {
    if(arguments.length > 1) {
      return value;
    } else {
      var name = Ember.$("#userName").val();
      var invalid = (name == undefined) ? false : name.length === 0;
      return invalid;
    }
  }.property().volatile(),

  actions: {
    removeError: function(){
      this.set('invalidName', false);
    },

    confirmOrder: function(){
      var controller = this;

      if(!controller.get('validMobile')) { return false; }
      if(controller.get('invalidName')) {
        controller.set('invalidName', true);
        return false;
      }

      controller.set("inProgress", true);
      var orderDetails = controller.get("orderDetails");

      // address details
      var district = controller.store.getById("district", orderDetails.get('districtId'));
      var addressProperties = {addressType: 'collection',
        district: district};

      // contact details
      var name = Ember.$("#userName").val();
      var mobile = config.APP.HK_COUNTRY_CODE + Ember.$("#mobile").val();
      var contactProperties = { name: name, mobile: mobile };
      var contact = controller.store.createRecord('contact', contactProperties);
      orderDetails.setProperties({ name: name, mobile: mobile });

      // schedule details
      var scheduleProperties = { scheduledAt: orderDetails.get('pickupTime'), slotName: orderDetails.get('slot') };
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
            orderDetails.save().then(function(gogovan_order){
              delivery.set('gogovanOrder', gogovan_order);

              // save delivery
              delivery.save().then(function() {
                controller.transitionToRoute('delivery.donation_details');
                controller.set("inProgress", false);
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
