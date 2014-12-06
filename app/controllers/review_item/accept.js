import Ember from 'ember';

export default Ember.ObjectController.extend({

  needs: ["review_item", "offer"],

  itemId: Ember.computed.alias('controllers.review_item.id'),
  itemTypeId: Ember.computed.alias('controllers.review_item.reviewItemTypeId'),
  itemTypeName: Ember.computed.alias('controllers.review_item.reviewItemTypeName'),

  defaultImageId: function(){
    var itemId = this.get('controllers.review_item.id');
    var item = this.store.getById('item', itemId);
    return item.get('displayImageUrl');
  }.property('controllers.review_item.id'),

  subItemTypes: function(){
    var parentId = parseInt(this.get('itemTypeId'));
    var data, _this = this;;
    var acceptSubItemTypes = [];
    var store = this.get('store');
    data = store.all('item_type').filterBy('parentId', parentId).filterBy('isItemTypeNode', true);
    data.forEach(function(subtype) {
      var subItemTypeProperties = {};
      subItemTypeProperties.itemId = _this.get('controllers.review_item.id');
      subItemTypeProperties.itemTypeId = subtype.get("id");
      subItemTypeProperties.itemTypeName = subtype.get("text");
      acceptSubItemTypes.pushObject(subItemTypeProperties);
    });
    return acceptSubItemTypes;
  }.property("itemTypeId"),

  reviewItemDidChange: function() {
    this.set('itemTypeId', '');
    this.set('itemTypeName', '');
    this.set('itemId', '');
  }.observes('controllers.review_item.each'),
});
