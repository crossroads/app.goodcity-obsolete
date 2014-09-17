import Ember from 'ember';

export default Ember.ArrayController.extend({

  content: function() {
    this.store.find('message');
    return this.store.all('message');
  }.property(),

  unread: function() {
    return this.get('content')
    .filterBy('recipient.id', localStorage.currentUserId)
    .filterBy('state', 'unread');
  }.property('content.[]'),

  unreadSortingDesc:  ['id:desc'],
  unreadSorted: Ember.computed.sort('unread', 'unreadSortingDesc'),

  unreadFirst: function() {
    return this.get('unreadSorted')[0] || null;
  }.property('content.[]'),

  actions: {
    sendMessage: function(){
      return;
    }
  }
});
