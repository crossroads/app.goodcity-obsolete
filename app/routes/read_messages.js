import AuthorizeRoute from './authorize';

var ReadMessagesRoute = AuthorizeRoute.extend({

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

export default ReadMessagesRoute;
