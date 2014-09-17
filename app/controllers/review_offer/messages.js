import Ember from 'ember';

export default Ember.ArrayController.extend({

  needs: ["offer"],
  content: [],
  sortProperties: ['createdAt'],
  sortAscending: true,
  offerMessage: true,

  filteredContent: Ember.computed.filterBy('arrangedContent', 'isPrivate', false),

  actions: {
    sendMessage: function() {
      var offer_id = this.get('controllers.offer').get('id');
      var offer = this.store.getById('offer', offer_id);

      var newMessageProperties = this.getProperties('body');
      newMessageProperties.offer = offer;
      newMessageProperties.isPrivate = false;
      newMessageProperties.createdAt = Date.now();

      this.set('body', '');

      var message = this.store.createRecord('message', newMessageProperties);
      message.save();
    }
  }

});
