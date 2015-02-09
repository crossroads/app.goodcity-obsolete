import Ember from 'ember';
import readMessageMixin from '../mixins/read-message';

export default Ember.ArrayController.extend(readMessageMixin, {
  sortProperties: ['date'],
  sortAscending: true,
  showItemImage: false,
  itemImageUrl: null,
  senderImageUrl: null,

  nextNotification: function() {
    //retrieveNextNotification is not implemented here because it needs to call itself
    return this.retrieveNextNotification();
  }.property('[]'),

  showItem: function(notification) {
    var itemId = notification.entity.item_id;
    var url;
    this.set("showItemImage", itemId);
    if(itemId){
      url = this.store.getById('item', itemId).get("displayImageUrl");
      this.set('itemImageUrl', url);
    }
    url = this.store.getById("user", notification.entity.sender_id).get("displayImageUrl");
    this.set('senderImageUrl', url);
  },

  retrieveNextNotification: function() {
    var notification = this.get('firstObject');
    if (!notification) {
      return null;
    }

    this.setRoute(notification);

    // if current url matches notification view action url then dismiss notification
    var router = this.get("target");
    var currentUrl = router.get("url");
    var notificationUrl = router.generate.apply(router, notification.route);
    if (currentUrl === notificationUrl) {
      if (notification.entity_type === "message"){
        var message = this.store.getById("message", notification.entity.id);
        this.markMessageAsRead(message);
      }
      this.removeObject(notification);
      return this.retrieveNextNotification();
    }
    if (notification.entity_type === "message") {
      this.showItem(notification);
    }
    return notification;
  },

  setRoute: function(notification) {
    if (notification.entity_type === "message") {
      this.setMessageRoute(notification);
    } else if (notification.entity_type === "offer") {
      var routeName = this.get("session.currentUser.isDonor") ? "offer" : "review_offer";
      notification.route = [routeName, notification.entity.id];
    }
  },

  setMessageRoute: function(notification) {
    //note notification.entity has not been normalized thru ember so no 'get' method
    //and properties are 'offer_id' not 'offerId'

    var message = notification.entity;
    var offerId = message.offer_id;
    var itemId = message.item_id;

    if(this.get('session.currentUser.isDonor')) {
      if(itemId) {
        notification.route = ["item.messages", offerId, itemId];
      } else{
        notification.route = ["offer.messages", offerId];
      }
    } else if (message.is_private) {
      if(itemId) {
        notification.route = ["review_item.supervisor_messages", offerId, itemId];
      } else{
        notification.route = ["offer.supervisor_messages", offerId];
      }
    } else {
      if(itemId) {
        notification.route = ["review_item.donor_messages", offerId, itemId];
      } else{
        notification.route = ["offer.donor_messages", offerId];
      }
    }
  },

  actions: {
    view: function() {
      var notification = this.get("nextNotification");
      this.removeObject(notification);
      this.transitionToRoute.apply(this, notification.route);
    }
  }
});
