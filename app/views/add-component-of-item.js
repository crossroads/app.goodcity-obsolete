import Ember from 'ember';
import addComponent from './add-component';
import staticComponent from './static-component';


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
            "width", "quantity", "comment", "packagetypeid", "itemid", 'id');
          packageProperties.width         = child_vals.width;
          packageProperties.quantity      = child_vals.quantity;
          packageProperties.length        = child_vals.length;
          packageProperties.height        = child_vals.height;
          packageProperties.notes         = child_vals.comment;
          packageProperties.itemId        = child_vals.itemid;
          packageProperties.packageTypeId = child_vals.packagetypeid;
          packageProperties.id         = child_vals.pkgid;
          arrPackageProperties.pushObject(packageProperties);
        }
      });
      ths.get("controller").send("savePackageType", arrPackageProperties);
    },

    addItemTypeComponent: function(){
      var containerView = Ember.View.views['my_container_view'];
      var childView = containerView.createChildView(addComponent);
      containerView.pushObject(childView);
    },
  },

  didInsertElement: function(){
    this._super();
    var packages = this.get('packages.content');
    var subItemtypes = this.get('subItemTypes');
    var l=0;
    if(packages.get('length') > 0) {
      for (var i = 0; i < packages.get('length') ; i++) {
        var containerView = Ember.View.views['my_container_view'];
        var childView;
        if (l===0) {
          childView=  containerView.createChildView(staticComponent);
          }
          else {
          childView =  containerView.createChildView(addComponent);
        }

        var currentPackage = packages[i];
        childView.setProperties({
          pkgid:         currentPackage.get('id'),
          length:        currentPackage.get('length'),
          height:        currentPackage.get('height'),
          width:         currentPackage.get('width'),
          quantity:      currentPackage.get('quantity'),
          comment:       currentPackage.get('notes'),
          packagetypeid: currentPackage.get('packageType.id'),
          itemid:        currentPackage.get('itemId'),
          itemtypename:  currentPackage.get('packageName'),
          packagetype:  currentPackage.get('packageType')
        });
        containerView.pushObject(childView);
        l++;
      }
    }
    else {
      if (!(this.get("noSubItemType"))) {
        subItemtypes.forEach(function(subitemtype) {
          var containerView = Ember.View.views['my_container_view'];
          var childView;
          if (l===0) {
            childView=  containerView.createChildView(staticComponent);
            }
            else {
            childView =  containerView.createChildView(addComponent);
          }
          childView.setProperties({
            id:            subitemtype.itemTypeId,
            itemid:        subitemtype.itemId,
            itemtypename:  subitemtype.itemTypeName
          });
        containerView.pushObject(childView);
        l++;
        });
      }
    }
  }
});
export default addComponentOfItem;
