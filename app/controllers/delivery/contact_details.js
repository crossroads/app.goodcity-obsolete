import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ["delivery", "application"],

  selectedTerritory: {id: null},
  selectedDistrict: {id: null},

  isDisable: function(){
    var districtId = this.selectedDistrict && this.selectedDistrict.id;
    var street = this.get('street.length');
    var flat = this.get('flat.length');
    var building = this.get('building.length');

    return !(districtId && street && building && flat);
  }.property('selectedDistrict', 'street', 'building', 'flat'),

  territories: function(){
    return this.store.findAll('territory');
  }.property(),

  user: function(){
    return this.get('controllers.application').get('currentUser');
  }.property(),

  districtsByTerritory: function() {
    if(this.selectedTerritory && this.selectedTerritory.id) {
      return this.selectedTerritory.get('districts');
    } else {
      return this.store.findAll('district');
    }
  }.property('selectedTerritory'),

  actions: {
    saveContactDetails: function() {
      var addressProperties = this.getProperties('street', 'flat', 'building');
      addressProperties.district = this.selectedDistrict;
      addressProperties.addressType = 'collection';

      var contactProperties = {};
      contactProperties.name = Ember.$('#userName').val();
      contactProperties.mobile = "+852" + Ember.$('#mobile').val();

      var contact = this.store.createRecord('contact', contactProperties);
      var deliveryId = this.get('controllers.delivery').get('id');
      var delivery = this.store.getById('delivery', deliveryId);
      var offer = delivery.get('offer');
      var schedule = delivery.get('schedule');

      // Save the new model
      var route = this;
      contact.save().then(function(contact) {
        addressProperties.addressable = contact;
        var address = route.store.createRecord('address', addressProperties);
        address.save().then(function() {
          var delivery = route.store.update('delivery', {
            id: deliveryId,
            contact: contact,
            offer: offer,
            schedule: schedule
          });

          delivery.save().then(function() {
            route.transitionToRoute('delivery.thank_offer', contact);
          });
        });
      });
    }
  }
});
