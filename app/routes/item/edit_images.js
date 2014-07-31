import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('items.new', {controller: 'item.edit_images'});
  },

  model: function() {
    return this.modelFor('item');
  }
});
