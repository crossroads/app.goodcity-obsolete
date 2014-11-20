import Ember from 'ember';

export default Ember.ObjectController.extend({

  reviewItemTypeId: null,
  reviewItemTypeName: null,
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
