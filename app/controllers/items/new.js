import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    createItem: function() {

      var donorDescription = this.get('donorDescription');
      if (!donorDescription.trim()) { return; }

      // Create the new Item model
      var store = this.store;
      var item = store.createRecord('item', {
        donorDescription: donorDescription,
        isCompleted: false
      });

      // set item relationship on offer
      // NOTE: NOT WORKING QUITE YET - STEVE
      var offerId = this.get('offerId');
      store.find('offer', offerId).then(function(offer) {
        item.set('offer', offer);
      });

      // Clear the "New Item" text field
      this.set('donorDescription', '');

      // Save the new model
      item.save();

      // Go back to the main offer
      this.transitionToRoute('offer', offerId);
    }
  }
});
