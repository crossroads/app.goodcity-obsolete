import Ember from 'ember';
import sendMessage from './../send_message';

export default sendMessage.extend({

  offerMessage: true,
  displayMessage: true,
  filteredContent: Ember.computed.filterBy('allMessages', 'isPrivate'),

  actions: {
    sendMessage: function() {
      this._super(true);
    }
  }
});

