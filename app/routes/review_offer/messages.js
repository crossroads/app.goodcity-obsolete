import ReadMessagesRoute from './../read_messages';

export default ReadMessagesRoute.extend({
  staffRestricted: true,

  controllerName: 'offer.messages',
  renderTemplate: function() {
    this.render('message_template');
  },

  model: function() {
    var offerId = this.modelFor('offer').get('id');
    return this.store.filter('message', function(message) {
      return message.get('offer.id') === offerId;
    });
  }
});
