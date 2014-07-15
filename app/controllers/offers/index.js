import Ember from 'ember';

export default Ember.ArrayController.extend({

  pendingOffer: function () {
    var pending_offer = this.findBy('items.length',0);
    var offer_id = pending_offer ? pending_offer.id : null
    return offer_id;
  }.property('@each.items.length')

});
