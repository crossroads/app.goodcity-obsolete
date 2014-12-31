import Ember from 'ember';
import sendMessage from './../send_message';

export default sendMessage.extend({

  displayMessage: true,
  filteredContent: Ember.computed.filterBy('allMessages', 'isPrivate', false),

  actions: {
    sendMessage: function() {
      this._super(false);
    }
  }
});
