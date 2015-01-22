import Ember from 'ember';

export default Ember.ObjectController.extend({
  hasMultipleOffers: function(){
    return this.store.all('offer').get('length') > 1;
  }.property('model'),

  actions: {
    addItem: function() {
      var draftItemId = this.get("items").filterBy("state", "draft").get("firstObject.id") || "new";
      this.transitionToRoute('item.edit_images', draftItemId);
    },
  }
});
