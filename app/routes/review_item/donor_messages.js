import ReadMessagesRoute from './../read_messages';

export default ReadMessagesRoute.extend({
  renderTemplate: function() {
    this.render('message_template', {controller: 'review_item.donor_messages'});
  },

  model: function() {
    var itemId = this.modelFor('reviewItem').get('id');

    return this.store.filter('message', {item_id: itemId}, function(message) {
      return message.get('itemId') === parseInt(itemId);
    });
  }

});
