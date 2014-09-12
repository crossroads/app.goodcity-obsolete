import Ember from 'ember';

export default Ember.ArrayController.extend({

  needs: ["offer"],
  content: [],
  sortProperties: ['createdAt'],
  sortAscending: true,

  actions: {
    sendMassage: function() {
      var offer_id = this.get('controllers.offer').get('id');
      var offer = this.store.getById('offer', offer_id);

      var newMessageProperties = this.getProperties('body');
      newMessageProperties.offer = offer;
      newMessageProperties.recipient = offer.get('user');

      this.set('body', '');

      var message = this.store.createRecord('message', newMessageProperties);
      message.save();
    }
  }

});
