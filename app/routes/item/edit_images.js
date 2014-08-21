import AuthorizeRoute from '../authorize';

export default AuthorizeRoute.extend({
  renderTemplate: function() {
    this.render('items.new', {controller: 'item.edit_images'});
  },

  model: function() {
    return this.modelFor('item');
  }
});
