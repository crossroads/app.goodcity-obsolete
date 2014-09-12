import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    var offerId = this.modelFor('offer').get('id');

    return this.store.filter('message', {offer_id: offerId}, function(message) {
      return message.get('offer.id') === offerId;
    });
  }

});
