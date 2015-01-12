import ReadMessagesRoute from './../read_messages';

export default ReadMessagesRoute.extend({
  staffRestricted: true,

  model: function() {
    var offerId = this.modelFor('offer').get('id');
    return this.store.filter('message', function(message) {
      return message.get('offer.id') === offerId && message.get('item') === null && message.get('isPrivate') === false;
    });
  }
});
