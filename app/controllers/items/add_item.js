import Ember from 'ember';

export default Ember.Controller.extend({

  previewImageId: function() {
    return localStorage.preview;
  }.property().volatile(),

  donorCondition: "New",
  needs: ["offer"],
  actions: {
    submitItem: function() {

      var donorDescription = this.get('donorDescription');
      if (donorDescription && !donorDescription.trim()) { return; }
      var donorCondition   = this.get('donorCondition');
      var imageIdentifiers = JSON.parse(localStorage.image_ids || "[]");

      delete localStorage.image_ids;
      delete localStorage.preview;

      // 'controllerFor' is deprecated, instead 'needs' can be used here.
      // Facing issue while using needs, will resolve it soon :Swati
      this.controllerFor('items.new').set('imageIds', "{}");

      // Create the new Item model
      var offer_id = this.get('controllers.offer').get('id');
      var offer = this.store.getById('offer', offer_id);
      var item = this.store.createRecord('item', {
        donorDescription: donorDescription,
        donorCondition: donorCondition,
        imageIdentifiers: imageIdentifiers,
        state: 'draft',
        offer: offer
      });

      // Clear the "New Item" text field
      this.set('donorDescription', '');
      this.set('donorCondition', 'New');

      // Save the new model
      var route = this;
      item.save().then(function() {
        route.transitionToRoute('offer', offer_id);
      });
    }
  }
});
