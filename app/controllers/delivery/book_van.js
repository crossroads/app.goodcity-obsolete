import Ember from 'ember';
import AjaxPromise from './../../utils/ajax-promise';

export default Ember.ObjectController.extend({

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

      var selectedDate = controller.get('selectedDate');
      selectedDate.setMinutes(selectedDate.getMinutes() + controller.get('selectedTime'));

      var requestProperties = {};
      requestProperties.pickup_time = selectedDate;
      requestProperties.district = controller.get('selectedDistrict.id');
      requestProperties.territory = controller.get('selectedTerritory.id');
      requestProperties.need_english = controller.get("speakEnglish");
      requestProperties.need_cart = controller.get("borrowTrolley");
      requestProperties.need_carry = controller.get("porterage");

      new AjaxPromise("/gogovan_orders/calculate_price", "POST", controller.get('session.authToken'), requestProperties)
        .then(function(data) {
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
