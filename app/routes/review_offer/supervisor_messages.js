import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate: function() {
    this.render('message_template', {controller: 'review_offer.supervisor_messages'});
  },

  model: function() {
    var offerId = this.modelFor('offer').get('id');
    return this.store.filter('message', {offer_id: offerId}, function(offer) {
      return offer.get('offer.id') === offerId;
    });
  }

});
