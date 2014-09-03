import Ember from 'ember';

export default Ember.ArrayController.extend({
  offersWithItems: function(){
    return this.rejectBy('items.length', 0);
  }.property('@each.itemCount'),

  actions: {
    newOffer: function(){
      var empty_offers = this.filterBy('items.length', 0);
      if (empty_offers.length === 0){
        this.transitionToRoute('offers.new');
      } else {
        this.transitionToRoute('offer', empty_offers.get('firstObject'));
      }
    }
  }

});
