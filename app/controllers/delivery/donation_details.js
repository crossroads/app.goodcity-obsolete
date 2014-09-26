import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['offer/index'],

  actions:{
    cancelOffer: function(offer){
      this.get('controllers.offer/index').send('cancelOffer', offer);
    }
  }
});
