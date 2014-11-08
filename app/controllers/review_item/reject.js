import Ember from 'ember';

export default Ember.Controller.extend({

  selectedId: 1,
  needs: ["review_item", "offer"],

  rejectionOptions: function(key, value) {

    if (arguments.length > 1) {
      return value;
    } else {

      var sortConditions, _this = this;
      var store = this.get('store');

      store.find('rejection_reason').then( function(objs) {
        sortConditions = objs.sortBy('id');
        _this.set("rejectionOptions", sortConditions);
        value = sortConditions;
      });
      return value;
    }
  }.property('rejection_reason.[]'),

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

      // Clear fields
      this.set('rejectReason', '');
      this.set('rejectionComments', '');
      this.set('selectedId', 1);

      // Save changes to Item
      var route = this;
      item.save().then(function() {
        route.transitionToRoute('review_offer.items');
      });
    }
  }

});
