import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    var offerId = this.modelFor('offer').get('id');
    // return this.store.find('message', {offer_id: offerId});

    return this.store.filter('message', {offer_id: offerId}, function(offer) {
        return offer.get('offerId') == offerId;
    });
  }

});
