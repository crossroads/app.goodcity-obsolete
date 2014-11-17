import Ember from 'ember';

var packages = Ember.ArrayController.extend({
  needs: ["review_item/accept"],

  itemTypeId: function(){
    return this.get('controllers.review_item/accept.itemTypeId');
  }.property('controllers.review_item/accept.itemTypeId'),

  itemTypeName: function(){
    return this.get('controllers.review_item/accept.itemTypeName');
  }.property('controllers.review_item/accept.itemTypeName'),

  itemDefaultImageId: function(){
    return this.get('controllers.review_item/accept.defaultImageId');
  }.property('controllers.review_item/accept.defaultImageId'),

  model: function() {
    return this.store.filter('package', function(pack) {
      return pack.get('package_type') === '301';
    });
  }.property('package.@each.package_type')

});
export default packages;
