import Ember from 'ember';

export default Ember.Controller.extend({

  needs: ["offer"],
  offerId: Ember.computed.alias('controllers.offer.id'),

  previewImageId: function() {
    return localStorage.favourite;
  }.property().volatile(),

  imageCount: function() {
    return JSON.parse(localStorage.image_ids || "[]").length;
  }.property().volatile(),

  isNewItem: true,

  donorConditionId: null,

  actions: {
    submitItem: function() {

      var newItemProperties = this.getProperties('donorDescription');

      if(!(newItemProperties.donorDescription && newItemProperties.donorDescription.trim().length)) { return; }
      var donorConditionId = this.get('donorConditionId');
      if (!donorConditionId) { return; }
      newItemProperties.imageIdentifiers = JSON.parse(localStorage.image_ids || "[]");
      newItemProperties.favouriteImage   = localStorage.favourite;

      delete localStorage.image_ids;
      delete localStorage.favourite;

      // Create the new Item model
      newItemProperties.state = 'draft';
      var offerId = this.get('offerId');
      newItemProperties.offer = this.store.getById('offer', offerId);
      newItemProperties.donorCondition = this.store.getById('donor_condition', donorConditionId);
      var item = this.store.createRecord('item', newItemProperties);

      // Clear the "New Item" text field
      this.set('donorDescription', '');

      // Save the new model
      var route = this;
      item.save().then(function() {
        route.transitionToRoute('offer', offerId);
      });
    },
  }
});
