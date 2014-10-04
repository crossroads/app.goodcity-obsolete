import AuthorizeRoute from './../authorize';
import Ember from 'ember';

export default AuthorizeRoute.extend({
  renderTemplate: function() {
    this.render('message_template', {controller: 'offer.messages'});
  },

  model: function() {
    var offerId = this.modelFor('offer').get('id');
    return this.store.filter('message', {offer_id: offerId}, function(message) {
      return message.get('offerId') === parseInt(offerId);
    });
  },

  afterModel: function(messages) {
    var unreadMessages = messages.filterBy('state', 'unread');
    unreadMessages.forEach(function(message) {
      message.set('state', 'read');
    });

    return Ember.RSVP.all(unreadMessages.invoke('save'));
  }

});
