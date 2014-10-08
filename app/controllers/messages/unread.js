import Ember from 'ember';

export default Ember.ArrayController.extend({

  needs: ['authorize', 'application'],
  sortProperties: ['id'],
  sortAscending: false,

  model: function() {
    return this.store.filter('message', {state: 'unread'}, function(message) {
      return message.get('state') === 'unread';
    });
  }.property('message.[]'),

  unreadFirst: function() {
    return this.get('model.lastObject') || null;
  }.property('model.[]'),

  actions: {
    reply: function(messageId, offerId) {
      var currentUser = this.get('controllers.application.currentUser');
      var offer = this.store.getById('offer', offerId);
      var message = this.store.getById('message', messageId);

      if(currentUser.get('isDonor')) {
        this.transitionToRoute("offer.messages", offer);
      } else {
        if(message.get('isPrivate')) {
          this.transitionToRoute("review_offer.supervisor_messages", offer);
        } else {
          this.transitionToRoute("review_offer.messages", offer);
        }
      }

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
