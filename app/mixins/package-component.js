import Ember from 'ember';
import addComponent from '../views/add-component';
import staticComponent from '../views/static-component';

var PackageComponentMixin = Ember.Mixin.create({
  actions: {
    acceptOffer: function(){
      var  ths = this;
      var getContainer = Ember.View.views['my_container_view'];
      var getChildren  = getContainer.get("childViews");
      var arrPackageProperties = [];
      getChildren.forEach(function(chld) {
        // var updated_child_view = chld.get("childViews")[0];
        var packageItemId = ths.get("itemid");
        if (getContainer.get('childViews').contains(chld)) {
          var packageProperties = {};
          var child_vals = chld.getProperties("length", "height",
            "width", "quantity", "comment", "packagetype", "packagetypeid",
            "pkgid");
          packageProperties.itemId        = packageItemId;
          packageProperties.id            = child_vals.pkgid;
          packageProperties.width         = child_vals.width;
          packageProperties.quantity      = child_vals.quantity;
          packageProperties.length        = child_vals.length;
          packageProperties.height        = child_vals.height;
          packageProperties.notes         = child_vals.comment;
          packageProperties.packagetypeid = child_vals.packagetypeid;
          packageProperties.packagetype   = child_vals.packagetype;

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

    renderViews: function(){
      // var packages = this.get("allPackages.content");
      var subItemtypes = this.get('subItemTypes');
      var l=0;

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
            id:             subitemtype.itemTypeId,
            itemtypeid:     subitemtype.itemTypeId,
            itemid:         subitemtype.itemId,
            itemtypename:   subitemtype.name,
            isDefaultIType: subitemtype.isItemTypeNode,
            packagetypeid:  subitemtype.itemTypeId,
            packagetype:    subitemtype,
            subitemtypes:   subitemtype,
            length:         subitemtype.length,
            height:         subitemtype.height,
            width:          subitemtype.width,
            quantity:       subitemtype.quantity
          });
          containerView.pushObject(childView);
        l++;
        });
      }
      return;
    },
    renderComponent: function(){
      var _this = this;
      var packages = _this.get('packages.arrangedContent');
      var subItemtypes = _this.get('subItemTypes');
      var l = 0;
      if(packages.get('length') > 0) {
        // _this.send("createUpdateChildView", packages);
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
            itemid:        currentPackage.get('itemId'),
            itemtypeid:    currentPackage.get('packageTypeObject.id'),
            itemtypename:  currentPackage.get('packageTypeObject.name'),
            packagetypeid: currentPackage.get('packageTypeObject.id'),
            packagetype:   currentPackage.get('packageTypeObject')
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
              id:             subitemtype.itemTypeId,
              itemtypeid:     subitemtype.itemTypeId,
              itemid:         subitemtype.itemId,
              itemtypename:   subitemtype.name,
              isDefaultIType: subitemtype.isItemTypeNode,
              packagetypeid:  subitemtype.itemTypeId,
              packagetype:    subitemtype,
              subitemtypes:   subitemtype,
            });
          containerView.pushObject(childView);
          l++;
          });
        }
      }
    },

    createUpdateChildView: function(packageViewDetails){
      var pkgCount=0;
      for (var i = 0; i < packageViewDetails.get('length') ; i++) {
          var containerView = Ember.View.views['my_container_view'];
          var childView;
          if (pkgCount===0) {
            childView=  containerView.createChildView(staticComponent);
            }
            else {
            childView =  containerView.createChildView(addComponent);
          }

          var currentPackage = packageViewDetails[i];
          childView.setProperties({
            pkgid:         currentPackage.get('id'),
            length:        currentPackage.get('length'),
            height:        currentPackage.get('height'),
            width:         currentPackage.get('width'),
            quantity:      currentPackage.get('quantity'),
            comment:       currentPackage.get('notes'),
            packagetypeid: currentPackage.get('packageTypeObject.id'),
            itemid:        currentPackage.get('itemId'),
            itemtypename:  currentPackage.get('packageTypeObject.name'),
            itemtypeid:    currentPackage.get('packageTypeObject.id'),
            packagetype:   currentPackage.get('packageTypeObject')
          });
          containerView.pushObject(childView);
          pkgCount++;
        }
    }
  },
  didInsertElement: function() {
    this._super();
    return this.send("renderComponent");
  },

});
export default PackageComponentMixin;
