import Ember from 'ember';

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
      if(this.get('invalidDate') || this.get('invalidTime')) { return false; }

      var selectedDate = this.get('selectedDate');
      selectedDate.setMinutes(selectedDate.getMinutes() + this.get('selectedTime'));

      var requestProperties = {};
      requestProperties.pickup_time = selectedDate;
      requestProperties.district = this.get('selectedDistrict.id');
      requestProperties.territory = this.get('selectedTerritory.id');

    },
  }
});
