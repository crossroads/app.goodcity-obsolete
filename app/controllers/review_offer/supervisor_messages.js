import Ember from 'ember';

export default Ember.ArrayController.extend({

  needs: ["offer"],
  sortProperties: ['createdAt'],
  sortAscending: true,
  offerMessage: true,

  filteredContent: Ember.computed.filterBy('arrangedContent', 'isPrivate'),

  actions: {
    sendMessage: function() {
      var offer_id = this.get('controllers.offer').get('id');
      var offer = this.store.getById('offer', offer_id);

      var newMessageProperties = this.getProperties('body');
      newMessageProperties.offer = offer;
      newMessageProperties.isPrivate = true;
      newMessageProperties.createdAt = Date.now();

      this.set('body', '');

      var message = this.store.createRecord('message', newMessageProperties);
      message.save().then(function(message){
        message.reload();
      });
    }
  }

});
