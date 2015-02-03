import AuthorizeRoute from './authorize';
import readMessageMixin from '../mixins/read-message';

var ReadMessagesRoute = AuthorizeRoute.extend(readMessageMixin, {

  afterModel: function(messages) {
    var _this = this;
    var unreadMessages = messages.filterBy('state', 'unread');

    unreadMessages.forEach(function(message) {
      _this.markMessageAsRead(message);
    });
  }

});

export default ReadMessagesRoute;
