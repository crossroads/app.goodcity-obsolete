import Ember from 'ember';
import AjaxPromise from './../../utils/ajax-promise';

export default Ember.ObjectController.extend({
  needs: ['delivery'],

  user: Ember.computed.alias('session.currentUser'),
  territoryId: Ember.computed.alias('user.address.district.territory.id'),
  districtId: Ember.computed.alias('user.address.district.id'),
  selectedTerritory: {id: null},
  selectedDistrict: {id: null},
  selectedDate: null,
  selectedTime: null,
  speakEnglish: false,
  borrowTrolley: false,
  porterage: false,

  invalidDate: Ember.computed.empty("selectedDate"),
  invalidTime: Ember.computed.empty("selectedTime"),

  territories: function(){
    return this.store.all('territory').sortBy("name");
  }.property(),

  districtsByTerritory: function() {
    if(this.selectedTerritory && this.selectedTerritory.id) {
      return this.selectedTerritory.get('districts').sortBy("name");
    } else {
      return this.store.all('district').sortBy("name");
    }
  }.property('selectedTerritory'),

  actions: {
    bookVan: function(){
      var controller = this;
      if(controller.get('invalidDate') || controller.get('invalidTime')) { return false; }

      // save address
      // var addressProperties = {addressType: 'collection',
      //   district: controller.get('selectedDistrict')}
      // var address = controller.store.createRecord('address', addressProperties);
      // address.save();

      var selectedDate = controller.get('selectedDate');
      selectedDate.setMinutes(selectedDate.getMinutes() + controller.get('selectedTime'));

      var requestProperties = {};
      requestProperties.pickupTime = selectedDate;
      requestProperties.districtId = controller.get('selectedDistrict.id');
      requestProperties.territoryId = controller.get('selectedTerritory.id');
      requestProperties.needEnglish = controller.get("speakEnglish");
      requestProperties.needCart = controller.get("borrowTrolley");
      requestProperties.needCarry = controller.get("porterage");

      var order = controller.store.createRecord('gogovan_order', requestProperties);

      new AjaxPromise("/gogovan_orders/calculate_price", "POST", controller.get('session.authToken'), requestProperties).then(function(data) {
          order.set('baseFee', data['base']);
          controller.transitionToRoute('delivery.confirm_van');
        })
        .catch(function(xhr) {
          alert("error");
        })
        .finally(function() {
          console.log("Done.")
        });
    },
  }
});
