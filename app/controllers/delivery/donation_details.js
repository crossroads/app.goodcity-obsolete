import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['offer/index'],

  confirmedItems: function(){
    var items = this.get('offer.items');
    return items.filterBy('state', 'accepted');
  }.property('offer.items.@each'),

  actions:{
    cancelOffer: function(offer){
      this.get('controllers.offer/index').send('cancelOffer', offer);
    }
  }
});
