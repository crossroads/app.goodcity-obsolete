import Ember from 'ember';
import AjaxPromise from './../../utils/ajax-promise';
import addressDetails from './address_details';

export default addressDetails.extend({
  needs: ['delivery'],

  selectedDate: null,
  selectedTime: null,
  speakEnglish: false,
  borrowTrolley: false,
  porterage: false,

  actions: {
    bookVan: function(){
      var controller = this;

      var selectedDate = controller.get('selectedDate');
      var deliveryId = controller.get('controllers.delivery').get('id');
      var delivery = controller.store.getById('delivery', deliveryId);

      selectedDate.setMinutes(selectedDate.getMinutes() + controller.get('selectedTime'));

      var requestProperties = {};
      requestProperties.pickupTime = selectedDate;
      requestProperties.slot = Ember.$('#selectedTime').val();
      requestProperties.districtId = controller.get('selectedDistrict.id');
      requestProperties.territoryId = controller.get('selectedTerritory.id');
      requestProperties.needEnglish = controller.get("speakEnglish");
      requestProperties.needCart = controller.get("borrowTrolley");
      requestProperties.needCarry = controller.get("porterage");
      requestProperties.offerId = delivery.get('offer.id');

      var order = controller.store.createRecord('gogovan_order', requestProperties);
      order.set('delivery', delivery);

      new AjaxPromise("/gogovan_orders/calculate_price", "POST", controller.get('session.authToken'), requestProperties).then(function(data) {
          order.set('baseFee', data['base']);
          controller.transitionToRoute('delivery.confirm_van');
        });
    },
  }
});
