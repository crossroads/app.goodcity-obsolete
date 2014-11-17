import Ember from 'ember';
import addComponent from './add-component';
import packages from '../controllers/packages';

var addComponentOfItem = Ember.View.extend({

    templateName: 'packages/add_component_link',

    actions: {
      acceptOffer: function(){
        var  ths = this;
        var getContainer = Ember.View.views['my_container_view'];
        var getChildren  = getContainer.get("childViews");

        getChildren.forEach(function(chld) {
          if (getContainer.get('childViews').contains(chld)) {
            var packageProperties = {};
            packageProperties.width = chld.get("width");
            packageProperties.quantity = chld.get("qty");
            packageProperties.length = chld.get("length");
            packageProperties.height = chld.get("height");
            var package1 = ths.controller.store.createRecord("package", packageProperties);
            package1.save();
          }
        });
      },
      addItemTypeComponent: function(event){
        var containerView = Ember.View.views['my_container_view'];
        var childView = containerView.createChildView(addComponent);
        var childLength = 0;
        childLength  = containerView.get('childViews') ? (containerView.get('childViews').length + 1 ): 0;
        childView.set("id", (childLength));
        containerView.pushObject(childView);
      }
    }

});
export default addComponentOfItem;
