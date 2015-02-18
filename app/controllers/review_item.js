import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['review_item/accept'],

  defaultPackage: Ember.computed.alias('itemType'),
  item: Ember.computed.alias('model'),

  isExpanded: false,
  currentImageCount: 1,

  previewImage: function(){
    return this.get('images').toArray()[this.get('currentImageCount') - 1];
  }.property('model', 'currentImageCount', 'images.@each'),

  leftArrow: function(key, value){
    if(arguments.length > 1) {
      return value;
    } else {
      return this.get('currentImageCount') !== 1;
    }
  }.property('currentImageCount'),

  rightArrow: function(key, value){
    if(arguments.length > 1) {
      return value;
    } else {
      return this.get('images.length') !== this.get('currentImageCount');
    }
  }.property('currentImageCount'),

  previewImageBgCss: function() {
    var css = this.get("instructionBoxCss");
    if (!this.get("previewImage")) {
      return css;
    }
    return css + "background-image:url(" + this.get("previewImage.imageUrl") + ");" +
      "background-size: " + (this.get("isExpanded") ? "contain" : "cover") + ";";
  }.property("previewImage", "isExpanded"),

  instructionBoxCss: function() {
    var height = Ember.$(window).height() * 0.6;
    return "min-height:" + height + "px;";
  }.property("previewImage", "isExpanded"),

  itemTypeName: function(key, value) {
    return (arguments.length > 1) ? value :  this.get('defaultPackage.name');
  }.property('defaultPackage'),

  itemTypeId: function(key, value) {
    return (arguments.length > 1) ? value : this.get('defaultPackage.id');
  }.property('defaultPackage' ),

  itemId: function(){
    return this.get("id");
  }.property('model'),

  actions: {
    getItemId: function(id, name) {
      this.set('itemTypeId', id);
      this.set('itemTypeName', name);
      this.get('controllers.review_item/accept').send('setItemTypeDetails', id, name);
      return;
    },

    expandImage: function() {
      var value = this.get("isExpanded");
      this.set("isExpanded", !value);
    },

    showPreviousImage: function() {
      var currentCount = this.get('currentImageCount') - 1;
      this.set('currentImageCount', currentCount);
    },

    showNextImage: function() {
      var currentCount = this.get('currentImageCount') + 1;
      this.set('currentImageCount', currentCount);
    },
  }
});
