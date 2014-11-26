import Ember from 'ember';

export default Ember.ObjectController.extend({

  needs: ["review_item", "offer"],

  itemId: Ember.computed.alias('controllers.review_item.reviewItemId'),
  itemTypeId: Ember.computed.alias('controllers.review_item.reviewItemTypeId'),
  itemTypeName:  Ember.computed.alias('controllers.review_item.reviewItemTypeName'),
  defaultImageId: Ember.computed.alias('controllers.review_item.defaultImageId'),

  reviewItemDidChange: function() {
    this.set('itemTypeId', '');
    this.set('itemTypeName', '');
    this.set('itemId', '');
  }.observes('controllers.review_item.each'),
});
