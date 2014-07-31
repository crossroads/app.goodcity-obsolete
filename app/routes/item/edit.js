import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('items.add_item', {controller: 'item.edit'});
  },

  model: function() {
    return this.modelFor('item');
  }
});
