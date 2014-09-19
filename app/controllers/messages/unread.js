import Ember from 'ember';

export default Ember.ArrayController.extend({

  sortProperties: ['createdAt'],
  sortAscending: false,

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
    reply: function(id, offerId) {
      var offer = this.store.getById('offer', offerId);
      this.transitionToRoute("offer.messages", offer);
    },

    viewUnread: function() {
      var uniqueOfferIds = this.get('unread')
        .map(function(item) { return item.get('offerId'); })
        .uniq();

      if (uniqueOfferIds.length > 1) {
        this.transitionToRoute("offers.index");
      }
      else if (uniqueOfferIds.length == 1) {
        var offer = this.store.getById('offer', this.get('unreadFirst.offerId'));
        this.transitionToRoute("offer.messages", offer);
      }
    }
  }
});
