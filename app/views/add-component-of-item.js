import Ember from 'ember';
import addComponent from './add-component';

var addComponentOfItem = Ember.View.extend({

  templateName: 'packages/add_component_link',

  actions: {
    acceptOffer: function(){
      var  ths = this;
      var getContainer = Ember.View.views['my_container_view'];
      var getChildren  = getContainer.get("childViews");
      var arrPackageProperties = [];
      getChildren.forEach(function(chld) {
        var updated_child_view = chld.get("childViews")[0];
        if (getContainer.get('childViews').contains(chld)) {
          var packageProperties = {};
          var child_vals = updated_child_view.getProperties("length", "height",
            "width", "quantity", "comment", "packagetypeid", "itemid");
          packageProperties.width         = child_vals.width;
          packageProperties.quantity      = child_vals.quantity;
          packageProperties.length        = child_vals.length;
          packageProperties.height        = child_vals.height;
          packageProperties.notes         = child_vals.comment;
          packageProperties.itemId        = child_vals.itemid;
          packageProperties.packageTypeId = child_vals.packagetypeid;
          arrPackageProperties.pushObject(packageProperties);
        }
      });
      ths.get("controller").send("savePackageType", arrPackageProperties);
    },

    addItemTypeComponent: function(){
      var containerView = Ember.View.views['my_container_view'];
      var childView = containerView.createChildView(addComponent);
      var childLength = 0;
      childLength = containerView.get('childViews') ? (containerView.get('childViews').length + 1 ): 0;
      childView.set("id", (childLength));
      containerView.pushObject(childView);
    },
  },

  didInsertElement: function(){
    this._super();
    var packages = this.get('packages.content');
    if(packages.get('length') > 0) {
      for (var i = packages.get('length') - 1; i >= 0; i--) {
        var containerView = Ember.View.views['my_container_view'];
        var childView = containerView.createChildView(addComponent);
        var currentPackage = packages[i];
        childView.setProperties({
          id:            currentPackage.get('id'),
          length:        currentPackage.get('length'),
          height:        currentPackage.get('height'),
          width:         currentPackage.get('width'),
          quantity:      currentPackage.get('quantity'),
          comment:       currentPackage.get('notes'),
          packagetypeid: currentPackage.get('packageTypeId'),
          itemid:        currentPackage.get('itemId'),
          itemtypename:  currentPackage.get('packageName')
        });
        containerView.pushObject(childView);
      };
    }
  }
});
export default addComponentOfItem;
