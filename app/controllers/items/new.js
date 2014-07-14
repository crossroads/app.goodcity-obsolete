import Ember from 'ember';

export default Ember.ArrayController.extend({

  addDetails: function() {
    this.transitionToRoute('items.add_item');
  }

});
