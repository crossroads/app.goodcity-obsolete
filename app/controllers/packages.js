import Ember from 'ember';

var packages = Ember.ArrayController.extend({
  needs: ["review_item/accept"],

  itemId: function(){
    return this.get('controllers.review_item/accept.itemId');
  }.property('controllers.review_item/accept.itemId'),

  itemTypeId: function(){
    return this.get('controllers.review_item/accept.itemTypeId');
  }.property('controllers.review_item/accept.itemTypeId'),

  itemTypeName: function(){
    return this.get('controllers.review_item/accept.itemTypeName');
  }.property('controllers.review_item/accept.itemTypeName'),

  itemDefaultImageId: function(){
    return this.get('controllers.review_item/accept.defaultImageId');
  }.property('controllers.review_item/accept.defaultImageId'),

  noPackages: function(){
    return this.get('allPackages.length') === 0;
  }.property('packages.@each'),

  allPackages: function(){
    var item = this.store.getById('item', this.get('itemId'));
    return item.get('packages');
  }.property('packages.@each'),

  actions: {
    savePackageType: function(packageDetails){
      var _this = this;
      var packagePromises = [];

      var item = this.store.getById('item', this.get('itemId'));
      item.set('itemType', this.store.getById('item_type', this.get('itemTypeId')));
      packagePromises.pushObject(item.save());

      packageDetails.forEach(function(packDetail){
        packDetail.item = _this.store.getById('item', packDetail.itemId);
        packDetail.packageType = _this.store.getById('item_type', packDetail.packageTypeId);

        var packageNew = _this.store.createRecord("package", packDetail);
        packagePromises.pushObject(packageNew.save());
      });

      Ember.RSVP.all(packagePromises).then(function() {
        var acceptItem = {id: _this.get("itemId") , state_event: "accept",
          itemType: _this.store.getById('item_type', _this.get("itemTypeId"))};
        var item = _this.store.update('item', acceptItem);
        item.save().then(function() {
          _this.transitionToRoute('review_offer.items');
        });
      });
    }
  }
});
export default packages;
