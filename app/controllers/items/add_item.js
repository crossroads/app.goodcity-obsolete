import Ember from 'ember';
import ValidateItem from './../validate_item'

export default ValidateItem.extend({

  needs: ["offer"],
  offerId: Ember.computed.alias('controllers.offer.id'),
  isNewItem: true,

  previewImageId: function() {
    return localStorage.favourite;
  }.property().volatile(),

  imageCount: function() {
    return JSON.parse(localStorage.image_ids || "[]").length;
  }.property().volatile(),

  donorConditionId: function(){
    var donor_conditions = this.store.all('donor_condition');
    var condition = donor_conditions.filterProperty('name', "New");
    return condition.get("firstObject.id") || null;
  }.property().volatile(),

  actions: {
    submitItem: function() {

      if(this.get("invalidDescription")) {
        this.set("addError", true);
        return false;
      }

      var newItemProperties = this.getProperties('donorDescription');
      var donorConditionId = this.get('donorConditionId');

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
