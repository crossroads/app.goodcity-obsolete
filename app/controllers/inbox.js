import Ember from 'ember';

export default Ember.ArrayController.extend(EmberPusher.Bindings, {

  recentSubmitted: function() {
    var content = this.get("content") || [];
    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      content: content.toArray(),
      sortProperties: ['submittedAt'],
      sortAscending: false
    });
  }.property("content.@each"),

  PUSHER_SUBSCRIPTIONS: {
    reviewer: ['submit_offer']
  },

  actions: {
    submitOffer: function(data){
      this.store.pushPayload(data);
      // this.get('model').pushObject(data['offer']);
    }
  }

});
