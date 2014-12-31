import Ember from 'ember';
import sendMessage from './../send_message';

export default sendMessage.extend({
  needs: ['offer'],

  offer: function(){
    var offerId = this.get('controllers.offer').get('id');
    return this.store.getById('offer', offerId);
  }.property('controllers.offer.id'),

  displayMessage: true,
  filteredContent: Ember.computed.filterBy('allMessages', 'isPrivate', false),

  actions: {
    sendMessage: function() {
      this._super(false);
    }
  }
});
