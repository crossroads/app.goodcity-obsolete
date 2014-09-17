import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate: function() {
    this.render('message_template', {controller: 'review_item.supervisor_messages'});
  },

  model: function() {
    var itemId = this.modelFor('reviewItem').get('id');
    return this.store.filter('message', {item_id: itemId}, function(item) {
      return item.get('item.id') === itemId;
    });
  }

});
