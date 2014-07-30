import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('items.add_item', {controller: 'item.edit'});
  },

  model: function() {
    var item = this.modelFor('item');
    localStorage.edit_image_ids = localStorage.updated_image_ids || JSON.stringify(item.get("imageIdentifiers").split(','));
    localStorage.edit_preview = localStorage.updated_preview || item.get("favouriteImage") || JSON.parse(localStorage.edit_image_ids)[0];
    localStorage.edit_favourite = localStorage.updated_favourite || item.get("favouriteImage") || JSON.parse(localStorage.edit_image_ids)[0];

    delete localStorage.updated_image_ids;
    delete localStorage.updated_preview;
    delete localStorage.updated_favourite;

    return item;
  }
});
