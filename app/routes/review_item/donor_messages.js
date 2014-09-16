import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate: function() {
    this.render('message_template', {controller: 'review_item.donor_messages'});
  },

  model: function(args) {
    var itemId = this.modelFor('reviewItem').get('id');

    return this.store.filter('message', function(message) {
      return message.get('item.id') === itemId;
    });
  }

});
