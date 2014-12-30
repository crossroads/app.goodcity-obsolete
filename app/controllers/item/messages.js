import Ember from 'ember';
import sendMessage from './../send_message';

export default sendMessage.extend({

  needs: ['item/index', 'item'],
  displayMessage: true,
  filteredContent: Ember.computed.filterBy('arrangedContent', 'isPrivate', false),

  item: function() {
    var itemId = this.get('controllers.item.id');
    return this.store.getById('item', itemId);
  }.property('controllers.item.id'),

  actions: {
    sendMessage: function() {
      this._super(false, true);
    },

    removeItem: function(item) {
      this.get('controllers.item/index').send('removeItem', item);
    }
  }
});
