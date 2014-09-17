import Ember from 'ember';

export default Ember.ArrayController.extend({

  sortProperties: ['createdAt'],
  sortAscending: true,

  content: function() {
    return this.store.filter('message', {state: 'unread'}, function(message) {
      return message.get('state') === 'unread';
    });
  }.property('message.[]'),

  unread: Ember.computed.filterBy('arrangedContent', 'recipient.id', localStorage.currentUserId),

  unreadFirst: function() {
    return this.get('unread')[0] || null;
  }.property('content.[]'),

  actions: {
    sendMessage: function(){
      return;
    }
  }

});




