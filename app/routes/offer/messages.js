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
    var adapter = this.container.lookup('adapter:application');

    unreadMessages.forEach(function(message) {
      var url = adapter.buildURL('message', message.get('id')) + '/mark_read';
      adapter.ajax(url, 'PUT').then(function(response) {
        message.setProperties(response.message);
      });
    });
  }

});
