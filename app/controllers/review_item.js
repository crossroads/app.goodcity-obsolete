import Ember from 'ember';

export default Ember.ObjectController.extend({

  defaultPackage: Ember.computed.alias('packages.firstObject.packageType'),

  reviewItemTypeName: function(key, value) {
    return (arguments.length > 1) ? value :  this.get('defaultPackage.name');
  }.property('defaultPackage'),

  reviewItemTypeId: function(key, value) {
    return (arguments.length > 1) ? value : this.get('defaultPackage.id')
  }.property('defaultPackage'),

  reviewItemId: function(){
    return this.get("id");
  }.property(),

  actions: {
    getItemId: function(id, name) {
      this.set('reviewItemTypeId', id);
      this.set('reviewItemTypeName', name);
      return;
    }

  }
});
