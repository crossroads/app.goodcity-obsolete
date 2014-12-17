import Ember from 'ember';

export default Ember.ObjectController.extend({

  needs: ["review_item", "offer", "packages"],

  itemId: Ember.computed.alias('model'),
  itemTypeId: Ember.computed.alias('controllers.review_item.itemTypeId'),
  itemTypeName: Ember.computed.alias('controllers.review_item.itemTypeName'),

  defaultImageId: function(){
    var itemId = this.get('itemId');
    var item = this.store.getById('item', itemId);
    return item.get('displayImageUrl');
  }.property('controllers.review_item.id', 'itemId'),

  subItemTypes: function(){
    var parentId = parseInt(this.get('itemTypeId'));
    var dataInItemType, _this = this;
    var acceptSubItemTypes = [];
    var store = this.get('store');
     dataInItemType = store.all('item_type').filterBy('parentId', parentId);
    if(Ember.isEmpty(dataInItemType)) {
      dataInItemType = store.all('item_type').filterBy('id', this.get('itemTypeId'));
    }
    dataInItemType.forEach(function(subtype) {
      var subItemTypeProperties = {};
      subItemTypeProperties.itemId = _this.get('controllers.review_item.id');
      subItemTypeProperties.id = subtype.get("id");
      subItemTypeProperties.itemTypeName = subtype.get("name");
      subItemTypeProperties.isDefaultIType = subtype.get("isItemTypeNode");
      acceptSubItemTypes.pushObject(subItemTypeProperties);
    });
    return acceptSubItemTypes;
  }.property("controllers.review_item.itemTypeName", "itemTypeId"),

  isPackageDeleted: function(key, value){
    return (arguments.length > 1) ? value :  false;
  }.property('itemTypeId'),

  reviewItemDidChange: function() {
    this.set('itemTypeId', '');
    this.set('itemTypeName', '');
    this.set('itemId', '');
  }.observes('controllers.review_item.each'),

  actions: {
    setItemTypeDetails: function(itemtypeid, itemtypename){
      this.set("itemTypeId", itemtypeid);
      this.set("itemTypeName", itemtypename);
      this.set("isPackageDeleted", true);
      this.get('controllers.packages').send('renderComponents');
    }
  }
});
