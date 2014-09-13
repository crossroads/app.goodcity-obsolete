import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['id'],
  sortAscending: false,

  content: function() {
    this.store.find('message');
    return this.store.all('message');
  }.property(),

  unread: function() {
    return this.get('content').filterBy('state', 'unread');
  }.property('content.[]'),

  unreadFirst: function() {
    return this.get('content').filterBy('state', 'unread')[0] || null;
  }.property('content.[]')
});
