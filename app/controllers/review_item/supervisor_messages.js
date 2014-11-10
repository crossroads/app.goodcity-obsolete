import Ember from 'ember';

export default Ember.ArrayController.extend({

  needs: ["offer", "review_item"],
  sortProperties: ['createdAt'],
  sortAscending: true,
  itemMessage: true,

  filteredContent: Ember.computed.filterBy('arrangedContent', 'isPrivate'),

  actions: {
    sendMessage: function() {
      var offer_id = this.get('controllers.offer').get('id');
      var offer = this.store.getById('offer', offer_id);

      var item_id = this.get('controllers.review_item.id');
      var item = this.store.getById('item', item_id);

      var newMessageProperties = this.getProperties('body');
      newMessageProperties.offer = offer;
      newMessageProperties.item = item;
      newMessageProperties.isPrivate = true;
      newMessageProperties.createdAt = Date.now();

      this.set('body', '');

      var message = this.store.createRecord('message', newMessageProperties);
      message.save();
    },

    showMessage: function(message) {
      var scrollTo = function() {
        window.setTimeout(function() { Ember.$('body').scrollTop(Ember.$("#"+message.get('id')).offset().top); }, 0);
      };
      this.transitionToRoute('review_offer.supervisor_messages').then(scrollTo);
    },
  }

});
