import Ember from 'ember';

export default Ember.ObjectController.extend({

  previewImageId: function() {
    return localStorage.edit_preview;
  }.property("this.controllerFor('item.edit_images').previewImageId").volatile(),

  actions: {
    submitItem: function(){

      var donorDescription = this.get('donorDescription');
      if (donorDescription && !donorDescription.trim()) { return; }
      var donorCondition   = this.get('donorCondition');
      var imageIdentifiers = JSON.parse(localStorage.edit_image_ids || "[]");

      delete localStorage.edit_image_ids;
      delete localStorage.edit_preview;

      // Update Item
      var offer_id = this.get('offerId');
      var offer = this.store.getById('offer', offer_id);
      var item = this.store.update('item', {
        id: this.get('id'),
        donorDescription: donorDescription,
        donorCondition:   donorCondition,
        imageIdentifiers: imageIdentifiers,
        offer: offer
      });

      // Save changes to Item
      var route = this;
      item.save().then(function() {
        route.transitionToRoute('offer', offer_id);
      });

    }
  }
});
