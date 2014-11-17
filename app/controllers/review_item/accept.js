import Ember from 'ember';

export default Ember.ObjectController.extend({

  needs: ["review_item", "offer"],

  itemTypeId: Ember.computed.alias('controllers.review_item.reviewItemTypeId'),
  itemTypeName:  Ember.computed.alias('controllers.review_item.reviewItemTypeName'),
  defaultImageId: Ember.computed.alias('controllers.review_item.defaultImageId'),

  reviewItemDidChange: function() {
    this.set('itemTypeId', '');
    this.set('itemTypeName', '');
  }.observes('controllers.review_item.each'),

  // actions: {
  //   acceptOffer: function(){
  //     alert("accept");
  //   }
  // }
});
