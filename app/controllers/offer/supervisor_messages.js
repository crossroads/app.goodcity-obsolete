import Ember from 'ember';
import sendMessage from './../send_message';

export default sendMessage.extend({
  needs: ['offer'],

  offer: function(){
    var offerId = this.get('controllers.offer').get('id');
    return this.store.getById('offer', offerId);
  }.property('controllers.offer.id'),

  filteredContent: Ember.computed.filterBy('allMessages', 'isPrivate'),

  actions: {
    sendMessage: function() {
      this._super(true);
    }
  }
});

