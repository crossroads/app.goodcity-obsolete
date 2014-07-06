import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ["offer"],
  actions: {
    createItem: function() {

      var donorDescription = this.get('donorDescription');
      if (!donorDescription.trim()) { return; }

      // Create the new Item model
      var offer = this.get('controllers.offer').get('model');
      var item = this.store.createRecord('item', {
        donorDescription: donorDescription,
        offer: offer
      });

      // Clear the "New Item" text field
      this.set('donorDescription', '');

      // Save the new model
      item.save().then(function() {
        offer.addObject(item)
      });

      // Go back to the main offer
      this.transitionToRoute('offer', offer.get('id'));
    }
  }
});
