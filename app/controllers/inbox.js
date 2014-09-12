import Ember from 'ember';

export default Ember.ArrayController.extend(EmberPusher.Bindings, {
  content: [],
  sortProperties: ['submittedAt'],
  sortAscending: false,

  PUSHER_SUBSCRIPTIONS: {
    reviewer: ['submit_offer']
  },

  actions: {
    submitOffer: function(data){
      this.store.pushPayload(data);
    }
  }

});
