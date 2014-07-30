import Ember from 'ember';

export default Ember.ObjectController.extend({

  previewImageId: function() {
    return localStorage.edit_favourite;
  }.property().volatile(),

  actions: {
    submitItem: function(){

      var donorDescription = this.get('donorDescription');
      if (donorDescription && !donorDescription.trim()) { return; }
      var donorCondition   = this.get('donorCondition');
      var imageIdentifiers = JSON.parse(localStorage.edit_image_ids || "[]");
      var favouriteImage   = localStorage.edit_favourite;

      delete localStorage.edit_image_ids;
      delete localStorage.edit_preview;
      delete localStorage.edit_favourite;

      // Update Item
      var offer_id = this.get('offerId');
      var offer = this.store.getById('offer', offer_id);
      var item = this.store.update('item', {
        id: this.get('id'),
        donorDescription: donorDescription,
        donorCondition:   donorCondition,
        imageIdentifiers: imageIdentifiers,
        favouriteImage: favouriteImage,
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
