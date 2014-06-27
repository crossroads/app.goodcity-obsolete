App.ItemsNewController = Ember.ArrayController.extend({
  actions: {
    createItem: function() {
      // Get the Item title set by the "New Item" text field
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      // Create the new Item model
      var item = this.store.createRecord('item', {
        title: title,
        isCompleted: false
      });

      // Clear the "New Item" text field
      this.set('newTitle', '');

      // Save the new model
      item.save();

      this.transitionToRoute('offer');
    }
  }
});
