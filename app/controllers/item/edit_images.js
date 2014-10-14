import Ember from 'ember';

export default Ember.ObjectController.extend({

  actions: {

    next: function() {
      this.transitionToRoute('item.edit');
    },

    back: function() {
      this.transitionToRoute('item.edit');
    },

    updateItem: function() {
      var itemProperties = this.getProperties('id', 'imageIdentifiers', 'favouriteImage');
      var offer_id = this.get('offerId');
      itemProperties.offer = this.store.getById('offer', offer_id);
      var item = this.store.update('item', itemProperties);
      item.save();
    }
  },

});
