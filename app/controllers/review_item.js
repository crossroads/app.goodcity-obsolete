import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['review_item/accept'],

  defaultPackage: Ember.computed.alias('itemType'),

  reviewItemTypeName: function(key, value) {
    return (arguments.length > 1) ? value :  this.get('defaultPackage.name');
  }.property('defaultPackage'),

  reviewItemTypeId: function(key, value) {
    return (arguments.length > 1) ? value : this.get('defaultPackage.id');
  }.property('defaultPackage'),

  reviewItemId: function(){
    return this.get("id");
  }.property(''),
  actions: {
    getItemId: function(id, name) {
      this.set('reviewItemTypeId', id);
      this.set('reviewItemTypeName', name);
      this.get('controllers.review_item/accept').send('setItemTypeDetails', id, name);
      return;
    }
  }
});
