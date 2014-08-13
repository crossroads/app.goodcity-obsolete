import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['selected_id'],
  classNames: ['district-selection'],
  currentSelected: {id: null},
  selected_id: null,

  currentSelectedObserver: function(){
    this.set('selected_id',this.getWithDefault('currentSelected.id'));
  }.observes('currentSelected'),

  districtsByTerritory: function(key, value) {
    var store = this.get('targetObject.store');
    return (arguments.length > 1 ? value : store.all('district'));
  }.property(),

  allTerritory: function(){
    var store = this.get('targetObject.store');
    return store.all('territory');
  }.property(),

  actions: {
    findDistrictbyTerritory: function(territory){
      if(territory){
        this.set('districtsByTerritory', territory.get('districts'));
      }
    }
  }
});
