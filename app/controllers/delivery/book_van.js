import Ember from 'ember';

export default Ember.ObjectController.extend({

  user: Ember.computed.alias('session.currentUser'),
  territoryId: Ember.computed.alias('user.address.district.territory.id'),
  districtId: Ember.computed.alias('user.address.district.id'),
  selectedTerritory: {id: null},
  selectedDistrict: {id: null},
  selectedDate: null,
  selectedTime: null,

  // static-list for now, will fetch from API later
  selectedExtraTime: {id: null},
  defaultPriceOption: {id: 0, name: "15 min (included)"},
  priceList: function(){
    var list = [];
    list.push(this.get("defaultPriceOption"));
    for (var i = 5; i <= 120; i = i+5) {
      list.push({id: i, name: i+" minutes +$"+i});
    }
    return list;
  }.property(),

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
      var selectedDate = this.get('selectedDate');
      selectedDate.setMinutes(selectedDate.getMinutes() + this.get('selectedTime'));

      var requestProperties = {};
      requestProperties.pickup_time = selectedDate;
      requestProperties.district = this.get('selectedDistrict.id');
      requestProperties.territory = this.get('selectedTerritory.id');
      requestProperties.extraTime = this.get("selectedExtraTime");

    },
  }
});
