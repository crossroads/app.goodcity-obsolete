import ReadMessagesRoute from './../read_messages';

export default ReadMessagesRoute.extend({
  renderTemplate: function() {
    this.render('message_template', {controller: 'review_offer.supervisor_messages'});
  },

  model: function() {
    var offerId = this.modelFor('offer').get('id');
    return this.store.filter('message', {offer_id: offerId}, function(message) {
      return message.get('offerId') === parseInt(offerId);
    });
  }

});
