import Ember from 'ember';

export default Ember.Controller.extend({

  needs: ['review_item'],

  itemTypeId: Ember.computed.alias('controllers.review_item.reviewItemTypeId'),
  itemTypeName:  Ember.computed.alias('controllers.review_item.reviewItemTypeName'),

  actions: {

  }
});
