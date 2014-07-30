import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('items.new', {controller: 'item.edit_images'});
  },

  model: function() {
    var item = this.modelFor('item');
    localStorage.edit_image_ids = JSON.stringify(item.get("imageIdentifiers").split(','));
    localStorage.edit_preview   = item.get("favouriteImageId");
    return item;
  }
});
