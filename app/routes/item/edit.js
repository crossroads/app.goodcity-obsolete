import AuthorizeRoute from '../authorize';

export default AuthorizeRoute.extend({
  renderTemplate: function() {
    this.render('items.add_item', {controller: 'item.edit'});
  },

  model: function() {
    return this.modelFor('item');
  }
});
