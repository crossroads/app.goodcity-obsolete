import Ember from 'ember';

export default Ember.ObjectController.extend({
  donorConditionId: function() {
    return this.get('donorCondition.id');
  }.property('donorCondition.id'),

  actions: {
     submitItem: function() {
      var _this = this;
      var condititon = this.store.getById("donor_condition", this.get("donorConditionId"));
      this.set("donorCondition", condititon);
      if (this.get("state") === "draft") {
        this.set("state_event", "submit");
      }
      var loadingView = this.container.lookup('view:loading').append();
      this.get("model").save().then(function() {
        _this.transitionToRoute('offer');
      }).finally(function() {
        loadingView.destroy();
      });
    },
  }
});
