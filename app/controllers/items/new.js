import Ember from 'ember';

export default Ember.ArrayController.extend({
  donorCondition: "New",
  needs: ["offer"],
  actions: {
    createItem: function() {

      var donorDescription = this.get('donorDescription');
      if (!donorDescription.trim()) { return; }
      var donorCondition = this.get('donorCondition');

      // Create the new Item model
      var offer_id = this.get('controllers.offer').get('id');
      var offer = this.store.getById('offer', offer_id);
      var item = this.store.createRecord('item', {
        donorDescription: donorDescription,
        donorCondition: donorCondition,
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
