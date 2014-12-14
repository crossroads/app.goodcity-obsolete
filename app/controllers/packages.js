import Ember from 'ember';
import addComponent from '../views/add-component';
import staticComponent from '../views/static-component';

var packages = Ember.ArrayController.extend({
  needs: ["review_item/accept"],

  itemId: function(){
    return this.get('controllers.review_item/accept.itemId');
  }.property('controllers.review_item/accept.itemId'),

  itemTypeId: function(){
    return this.get('controllers.review_item/accept.itemTypeId');
  }.property('controllers.review_item/accept.itemTypeId'),

  itemTypeName: function(){
    return this.get('controllers.review_item/accept.itemTypeName');
  }.property('controllers.review_item/accept.itemTypeName'),

  itemDefaultImageId: function(){
    return this.get('controllers.review_item/accept.defaultImageId');
  }.property('controllers.review_item/accept.defaultImageId'),

  subItemTypes: function(){
    return this.get('controllers.review_item/accept.subItemTypes');
  }.property('controllers.review_item/accept.subItemTypes', 'itemId'),

  noSubItemType: function() {
    return this.get('subItemTypes.length') === 0;
  }.property('subItemTypes.@each', 'itemId'),

  noPackages: function(){
    return this.get('allPackages.length') === 0;
  }.property('packages.@each', 'itemId'),

  packagetypeid: function(){
    if(this.get("noPackages")) {
      return this.get("itemTypeId");
    }
  }.property('noPackages', 'noSubItemType', 'itemId'),

  allPackages: function(){
    var item = this.store.getById('item', this.get('itemId'));
    return item.get('packages');
  }.property('packages.@each', 'itemId'),

  actions: {
    removePackageType: function(packageobj) {
      var _this = this;
      var existsPackageType = _this.store.all("package").filterBy("id", packageobj.pkgid);
        if(Ember.empty(existsPackageType)) {
         return;
        }
        else {
         existsPackageType.get("firstObject").destroyRecord();
         return;
        }
    },
    removewAllPackages: function(){
      var packages = this.get("allPackages.content");
      // deleted already saved all packages
      if(packages.length > 0 ) {
        packages.forEach(function(pkgType) {
          Ember.run.once(this, function() {
            pkgType.destroyRecord();
          });
        }, this);
      }
      return;
    },
    renderComponents: function(){
      this.send("removeChildViews");
      return;
    },

    removeChildViews: function() {
      var getContainer = Ember.View.views['my_container_view'];
      if (getContainer) {
        getContainer.removeAllChildren();
        this.send("renderViews");
      }
      return ;
    },

    savePackageType: function(packageDetails){
      var _this = this;
      var packagePromises = [], packageNew;

      _this.send("removewAllPackages");

      var item = this.store.getById('item', this.get('itemId'));
      item.set('itemType', this.store.getById('item_type', this.get('itemTypeId')));
      packagePromises.pushObject(item.save());

      packageDetails.forEach(function(packDetail){
        packDetail.item = _this.store.getById('item', packDetail.itemId);
        packDetail.packageType = _this.store.getById('item_type', packDetail.packagetypeid);

        if(packDetail.id) {
          packageNew = _this.store.update('package', packDetail);
        } else {
          packageNew = _this.store.createRecord("package", packDetail);
        }
        packagePromises.pushObject(packageNew.save());
      });

      Ember.RSVP.all(packagePromises).then(function() {
        var acceptItem = {id: _this.get("itemId") , state_event: "accept",
          itemType: _this.store.getById('item_type', _this.get("itemTypeId"))};
        var item = _this.store.update('item', acceptItem);
        item.save().then(function() {
          _this.transitionToRoute('review_offer.items');
        });
      });
      return;
    },

    renderViews: function(){
      var packages = this.get("allPackages.content");
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
            id:    subitemtype.id,
            itemtypeid:    subitemtype.id,
            itemid:        subitemtype.itemId,
            itemtypename:  subitemtype.itemTypeName,
            isDefaultIType: subitemtype.isDefaultIType,
            packagetypeid:  subitemtype.id,
            packagetype:    subitemtype,
            subitemtypes:   subitemtype,
            length:        subitemtype.length,
            height:        subitemtype.height,
            width:         subitemtype.width,
            quantity:      subitemtype.quantity
          });
          containerView.pushObject(childView);
        l++;
        });
      }
    // }
    return;
  }
}
});
export default packages;
