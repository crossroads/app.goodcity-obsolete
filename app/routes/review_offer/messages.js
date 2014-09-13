import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate: function() {
    this.render('message_template', {controller: 'review_offer.messages'});
  },

  model: function() {
    var offerId = this.modelFor('offer').get('id');

    return this.store.filter('message', function(message) {
      return message.get('offer.id') === offerId;
    });
  }

});