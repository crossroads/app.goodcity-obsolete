import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['date'],
  sortAscending: false,
  model: [],

  mostRecent: function() {
    return this.retrieveMostRecent();
  }.property('model.[]'),

  retrieveMostRecent: function() {
    var notification = this.get('model.lastObject');
    if (!notification) {
      return null;
    }

    this.setRoute(notification);

    // if current url matches notification view action url then dismiss notification
    var router = this.get("target");
    var currentUrl = router.get("url");
    var notificationUrl = router.generate.apply(router, notification.route);
    if (currentUrl === notificationUrl) {
      this.removeObject(notification);
      return this.retrieveMostRecent();
    }

    return notification;
  },

  setRoute: function(notification) {
    if (notification.entity_type === "message") {
      this.setMessageRoute(notification);
    }
  },

  setMessageRoute: function(notification) {
    //note notification.entity is raw from api so no 'get' method and properties 'offer_id' not 'offerId'
    var message = notification.entity;
    var offerId = message.offer_id;

    if(this.get('session.currentUser.isDonor')) {
      notification.route = ["offer.messages", offerId];
    } else {
      if (message.is_private) {
        notification.route = ["review_offer.supervisor_messages", offerId];
      } else {
        notification.route = ["review_offer.messages", offerId];
      }
    }
  },

  actions: {
    view: function() {
      var notification = this.get("mostRecent");
      this.removeObject(notification);
      this.transitionToRoute.apply(this, notification.route);
    }
  }
});
