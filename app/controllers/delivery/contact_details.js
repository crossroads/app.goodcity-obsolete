import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ["offer", "delivery"],

  selectedTerritory: {id: null},
  selectedDistrict: {id: null},

  userName: function(){
    return this.get('controllers.offer').get('userName');
  }.property(),

  isDisable: function(){
    var districtId = this.selectedDistrict && this.selectedDistrict.id;
    var name = this.get('userName.length');
    var mobile = this.get('mobile.length');
    var street = this.get('street.length');
    var flat = this.get('flat.length');
    var building = this.get('building.length');

    return !(districtId && name && mobile && street && building && flat);
  }.property('selectedDistrict', 'userName', 'mobile', 'street', 'building', 'flat'),

  territories: function(){
    return this.store.findAll('territory');
  }.property(),

  mobile: function(){
    return this.get('controllers.offer').get('userPhone');
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

      var contactProperties = this.getProperties('mobile');
      contactProperties.name = this.get('userName');
      var contact = this.store.createRecord('contact', contactProperties);

      var deliveryId = this.get('controllers.delivery').get('id');
      var offerId = this.get('controllers.offer').get('id');

      // Save the new model
      var route = this;
      contact.save().then(function(contact) {
        addressProperties.addressable = contact;
        var address = route.store.createRecord('address', addressProperties);
        address.save().then(function() {
          var delivery = route.store.update('delivery', {
            id: deliveryId,
            contact: contact,
            offer: route.store.getById('offer', offerId)
          });

          delivery.save().then(function() {
            route.transitionToRoute('delivery.thank_offer', contact);
          });
        });
      });
    }
  }
});
