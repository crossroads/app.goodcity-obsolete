import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['offer/index'],

  confirmedItems: function(){
    var items = this.get('offer.items');
    return items && items.filterBy('state', 'accepted');
  }.property('offer.items.@each'),

  isDeleting: function(key, value){
    if (arguments.length > 1) {
      return value;
    } else {
      return this.get('offer') ? this.get('offer.isDeleted') : true;
    }
  }.property('offer'),

  actions:{
    cancelOffer: function(offer){
      this.get('controllers.offer/index').send('cancelOffer', offer);
    }
  }
});
