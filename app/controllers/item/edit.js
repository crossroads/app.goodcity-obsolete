import Ember from 'ember';

export default Ember.ObjectController.extend({

  needs: ["item"],

  previewImageId: function() {
    return this.get('favouriteImage');
  }.property('favouriteImage').volatile(),

  donorConditions: Ember.computed.alias('controllers.item.donorConditions'),

  donorConditionId: function() {
    return this.get('donorCondition.id');
  }.property('donorCondition.id'),

  actions: {
    submitItem: function(){

      var newItemProperties = this.getProperties('id', 'donorDescription', 'imageIdentifiers', 'favouriteImage');
      if (newItemProperties.donorDescription && !newItemProperties.donorDescription.trim()) { return; }

      // Update Item
      var offer_id = this.get('offerId');
      var offer = this.store.getById('offer', offer_id);
      newItemProperties.offer = offer;
      var donor_condition_id = this.get('donorConditionId');
      var donorCondition = this.store.getById('donor_condition', donor_condition_id);
      newItemProperties.donorCondition = donorCondition;
      var item = this.store.update('item', newItemProperties);

      // Save changes to Item
      var route = this;
      item.save().then(function() {
        route.transitionToRoute('offer', offer_id);
      });

    },
  }
});
