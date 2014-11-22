import Ember from 'ember';
import ValidateItem from './../validate_item';

export default ValidateItem.extend({
  donorConditionId: function() {
    return this.get('donorCondition.id');
  }.property('donorCondition.id'),

  actions: {
     submitItem: function() {

      if(this.get("invalidDescription")) {
        this.set("addError", true);
        return false;
      }

      var _this = this;
      var condititon = this.store.getById("donor_condition", this.get("donorConditionId"));
      this.set("donorCondition", condititon);
      this.set("state", "pending");
      var loadingView = this.container.lookup('view:loading').append();
      this.get("model").save().then(function() {
        _this.transitionToRoute('offer');
      }).finally(function() {
        loadingView.destroy();
      });
    },
  }
});
