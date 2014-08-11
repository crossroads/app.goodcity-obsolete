import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['register'],
  content: '',

  districtsByTerritory: function(key, value) {
    return (arguments.length > 1 ? value : this.store.all('district'));
  }.property(),

  allTerritory: function(){
    return this.store.all('territory');
  }.property(),

  actions: {
    findDistrictbyTerritory: function(territory){
      if(territory){
        this.set('districtsByTerritory', territory.get('districts'));
      }
    }
  }
});
