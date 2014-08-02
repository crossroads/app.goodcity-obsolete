import Ember from 'ember';

export default Ember.Controller.extend({

  previewImageId: function() {
    return localStorage.favourite;
  }.property().volatile(),

  donorConditions: Ember.computed.alias('controllers.item.donorConditions'),

  donorConditionId: function() {
    return this.get('donorConditions').get('firstObject').get('id');
  },

  needs: ["offer", "item"],
  actions: {
    submitItem: function() {

      var donorDescription = this.get('donorDescription');
      if (donorDescription && !donorDescription.trim()) { return; }
      var donorConditionId = this.get('donorConditionId');
      var imageIdentifiers = JSON.parse(localStorage.image_ids || "[]");
      var favouriteImage   = localStorage.favourite;

      delete localStorage.image_ids;
      delete localStorage.favourite;

      // 'controllerFor' is deprecated, instead 'needs' can be used here.
      // Facing issue while using needs, will resolve it soon :Swati
      this.controllerFor('items.new').set('imageIds', "[]");

      // Create the new Item model
      var offer_id = this.get('controllers.offer').get('id');
      var offer = this.store.getById('offer', offer_id);
      var donorCondition = this.store.getById('donor_condition', donorConditionId);
      var item = this.store.createRecord('item', {
        donorDescription: donorDescription,
        imageIdentifiers: imageIdentifiers,
        favouriteImage: favouriteImage,
        state: 'draft',
        offer: offer,
        donorCondition: donorCondition
      });

      // Clear the "New Item" text field
      this.set('donorDescription', '');

      // Save the new model
      var route = this;
      item.save().then(function() {
        route.transitionToRoute('offer', offer_id);
      });
    },
  }
});
