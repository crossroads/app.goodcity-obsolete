import Ember from 'ember';

export default Ember.ObjectController.extend({

  defaultPackage: Ember.computed.alias('itemType'),

  reviewItemTypeName: function(key, value) {
    console.log('review_item typename: ', (arguments.length > 1) ? value :  this.get('defaultPackage.name'));
    return (arguments.length > 1) ? value :  this.get('defaultPackage.name');
  }.property('defaultPackage', 'reviewItemTypeId'),

  reviewItemTypeId: function(key, value) {
    return (arguments.length > 1) ? value : this.get('defaultPackage.id');
  }.property('defaultPackage'),


  actions: {
    getItemId: function(id, name) {
      this.set('reviewItemTypeId', id);
      this.set('reviewItemTypeName', name);
      return;
    }

  }
});
