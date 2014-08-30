import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ["offer"],

  selectedTerritory: {id: null},
  selectedDistrict: {id: null},

  territories: function(){
    return this.store.findAll('territory');
  }.property(),

  name: function(){
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

      var contactProperties = this.getProperties('name', 'mobile');
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
