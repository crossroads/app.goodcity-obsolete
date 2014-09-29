import Ember from 'ember';

export default Ember.ArrayController.extend({

  needs: ['authorize'],
  sortProperties: ['id'],
  sortAscending: false,

  content: function() {
    return this.store.filter('message', {state: 'unread'}, function(message) {
      return message.get('state') === 'unread';
    });
  }.property('message.[]'),

  unreadFirst: function() {
    return this.get('content.lastObject') || null;
  }.property('content.[]'),

  actions: {
    reply: function(id, offerId) {
      var offer = this.store.getById('offer', offerId);
      this.transitionToRoute("offer.messages", offer);
    },

    viewUnread: function() {
      if (this.get('controllers.authorize.isReviewer')) {
        this.transitionToRoute("inbox.under_review");
        return;
      }

      var uniqueOfferIds = this.get('unread').mapBy('offerId').uniq();

      if (uniqueOfferIds.length > 1) {
        this.transitionToRoute("offers.index");
      }
      else{
        var offer = this.store.getById('offer', uniqueOfferIds.get('firstObject'));
        this.transitionToRoute("offer.messages", offer);
      }
    }
  }
});
