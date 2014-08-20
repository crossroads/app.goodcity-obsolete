import Ember from 'ember';

export default Ember.Controller.extend({

  needs: ["offer"],

  previewImageId: function() {
    return localStorage.favourite;
  }.property().volatile(),

  donorConditionId: null,

  actions: {
    submitItem: function() {

      var newItemProperties = this.getProperties('donorDescription');

      if (newItemProperties.donorDescription && !newItemProperties.donorDescription.trim()) { return; }
      var donorConditionId = this.get('donorConditionId');
      if (!donorConditionId) { return; }
      newItemProperties.imageIdentifiers = JSON.parse(localStorage.image_ids || "[]");
      newItemProperties.favouriteImage   = localStorage.favourite;

      delete localStorage.image_ids;
      delete localStorage.favourite;

      // Create the new Item model
      newItemProperties.state = 'draft';
      var offer_id = this.get('controllers.offer').get('id');
      newItemProperties.offer = this.store.getById('offer', offer_id);
      newItemProperties.donorCondition = this.store.getById('donor_condition', donorConditionId);
      var item = this.store.createRecord('item', newItemProperties);

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
