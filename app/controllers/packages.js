import Ember from 'ember';
import PackageComponentMixin from '../mixins/package-component';

var packages = Ember.ArrayController.extend(PackageComponentMixin, {
  needs: ["review_item/accept"],

  isPackageDeleted: Ember.computed.alias('controllers.review_item/accept.isPackageDeleted'),

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

    addNewPackage: function(packageDetails){
      var _this = this;
      var packagePromises = [], packageNew;
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
    },

    savePackageType: function(packageDetails){
      var ths = this;
      var packagePromises = [];
      var packages = ths.get("allPackages.content");

      if(ths.get("isPackageDeleted") && packages.length > 0) {
        ths.store.find('package', {item: ths.get("itemId")}).then(function(pkgs) {
          pkgs.forEach(function(pkg) {
            pkg.deleteRecord();
            packagePromises.pushObject(pkg);
          });
        return Ember.RSVP.all(pkgs.invoke('save'));
        }).then(function() {
          ths.send("addNewPackage", packageDetails);
        });
      }
      else{
        ths.send("addNewPackage", packageDetails);
      }
      return;
    }
  }
});
export default packages;
