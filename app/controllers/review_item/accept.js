import Ember from 'ember';

export default Ember.ObjectController.extend({

  needs: ["review_item", "offer"],

  itemId: Ember.computed.alias('model'),
  itemTypeId: Ember.computed.alias('controllers.review_item.reviewItemTypeId'),
  itemTypeName: Ember.computed.alias('controllers.review_item.reviewItemTypeName'),

  defaultImageId: function(){
    var itemId = this.get('itemId');
    var item = this.store.getById('item', itemId);
    return item.get('displayImageUrl');
  }.property('controllers.review_item.id', 'itemId'),

  subItemTypes: function(){
    console.log("subItemTypes Name: ",  this.get('itemTypeName'));
    console.log("subItemTypes Get : ", this.get('itemTypeId'));
    var parentId = parseInt(this.get('itemTypeId'));
    var dataInItemType, _this = this;
    var acceptSubItemTypes = [];
    var store = this.get('store');
     dataInItemType = store.all('item_type').filterBy('parentId', parentId);
    if(Ember.empty(dataInItemType)) {
      dataInItemType = store.all('item_type').filterBy('id', this.get('itemTypeId'));
    }
    dataInItemType.forEach(function(subtype) {
      var subItemTypeProperties = {};
      subItemTypeProperties.itemId = _this.get('controllers.review_item.id');
      subItemTypeProperties.itemTypeId = subtype.get("id");
      subItemTypeProperties.itemTypeName = subtype.get("name");
      subItemTypeProperties.isDefaultIType = subtype.get("isItemTypeNode");
      acceptSubItemTypes.pushObject(subItemTypeProperties);
    });
    return acceptSubItemTypes;
  }.property("itemTypeId"),

  reviewItemDidChange: function() {
    this.set('itemTypeId', '');
    this.set('itemTypeName', '');
    this.set('itemId', '');
  }.observes('controllers.review_item.each'),

  actions: {
    setItemTypeDetails: function(itemtypeid, itemtypename){
      this.set("itemTypeId", itemtypeid);
      this.set("itemTypeName", itemtypename);
    }
  }
});
