import Ember from 'ember';

export default Ember.ObjectController.extend({

  needs: ["review_item", "offer"],

  itemId: Ember.computed.alias('controllers.review_item.reviewItemId'),
  itemTypeId: Ember.computed.alias('controllers.review_item.reviewItemTypeId'),
  itemTypeName:  Ember.computed.alias('controllers.review_item.reviewItemTypeName'),

  defaultImageId: function(){
    var itemId = this.get('controllers.review_item.id');
    var item = this.store.getById('item', itemId);
    return item.get('displayImageUrl');
  }.property('controllers.review_item.id'),

  reviewItemDidChange: function() {
    this.set('itemTypeId', '');
    this.set('itemTypeName', '');
    this.set('itemId', '');
  }.observes('controllers.review_item.each'),
});
