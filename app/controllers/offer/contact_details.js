import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ["offer"],

  selectedTerritory: {id: null},
  selectedDistrict: {id: null},

  isDisable: function(){
    return !((this.selectedDistrict && this.selectedDistrict.id) &&
      userName.value.length && mobile.value.length &&
      street.value.length && building.value.length && flat.value.length);
  }.property('selectedDistrict', 'userName', 'mobile', 'street', 'building', 'flat'),

  territories: function(){
    return this.store.findAll('territory');
  }.property(),

  userName: function(){
    return this.get('controllers.offer').get('userName');
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

      // Save the new model
      var route = this;
      contact.save().then(function(contact) {
        addressProperties.addressable = contact;
        var address = route.store.createRecord('address', addressProperties);
        address.save().then(function() {
          route.transitionToRoute('offer.thank_offer');
        });
      });
    }
  }
});
