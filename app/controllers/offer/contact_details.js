import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ["offer"],

  name: function(){
    return this.get('controllers.offer').get('userName');
  }.property(),

  mobilePhone: function(){
    return this.get('controllers.offer').get('userPhone');
  }.property(),

  actions: {
    saveContactDetails: function() {
      this.transitionToRoute('offer.thank_offer');
    }
  }
});
