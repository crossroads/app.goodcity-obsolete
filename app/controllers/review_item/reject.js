import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ["review_item", "offer"],

  selectedId: function(key, value){
    return (arguments.length > 1) ? value : this.get('rejectionReason.id');
  }.property('rejectionReason.id'),

  rejectionOptions: function() {
    return this.store.all('rejection_reason').sortBy('id');
  }.property(),

  actions: {
    rejectOffer: function(){
      var selectedReason = this.get('selectedId');
      var rejectProperties = this.getProperties('rejectReason', 'rejectionComments');

      rejectProperties.rejectionReason = this.store.getById('rejection_reason', selectedReason);
      rejectProperties.state_event = 'reject';

      var item_id = this.get('controllers.review_item.id');
      rejectProperties.id = item_id;

      var offer_id = this.get('controllers.offer').get('id');
      rejectProperties.offer = this.store.getById('offer', offer_id);

      var item = this.store.update('item', rejectProperties);

      // Save changes to Item
      var route = this;
      item.save().then(function() {
        route.transitionToRoute('review_offer.items');
      });
    }
  }

});
