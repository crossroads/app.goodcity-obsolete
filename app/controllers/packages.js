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

  actions: {
    savePackageType: function(packageDetails){
      var _this = this;
      packageDetails.forEach(function(packDetail){
        var packageNew = _this.store.createRecord("package", packDetail);
        packageNew.save();
      });
    }
  }
});
export default packages;
