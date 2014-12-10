import Ember from 'ember';

var addComponent = Ember.View.extend({
    templateName: "packages/add_component",

  actions: {
    removeItemTypeComponent: function() {
      var containerView = Ember.View.views['my_container_view'];
      var packageObj = this;
      containerView.get("controller").send("removePackageType", packageObj);
      containerView.removeChild(this);
    }
  }
});

export default addComponent;
