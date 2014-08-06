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

      var donorDescription = this.get('donorDescription');
      if (donorDescription && !donorDescription.trim()) { return; }
      var donorConditionId = this.get('donorConditionId');

      var imageIdentifiers = this.get('imageIdentifiers');
      var favouriteImage   = this.get('favouriteImage');

      delete localStorage.edit_image_ids;
      delete localStorage.edit_favourite;
      delete localStorage.updated_image_ids;
      delete localStorage.updated_favourite;

      this.controllerFor('item.edit_images').set('imageIds', "[]");

      // Update Item
      var offer_id = this.get('offerId');
      var offer = this.store.getById('offer', offer_id);
      var donorCondition = this.store.getById('donor_condition', donorConditionId);
      var item = this.store.update('item', {
        id: this.get('id'),
        donorDescription: donorDescription,
        imageIdentifiers: imageIdentifiers,
        favouriteImage: favouriteImage,
        offer: offer,
        donorCondition: donorCondition
      });

      // Save changes to Item
      var route = this;
      item.save().then(function() {
        route.transitionToRoute('offer', offer_id);
      });

    },
  }
});
