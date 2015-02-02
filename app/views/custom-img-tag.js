import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'img',
  attributeBindings:['src'],
  src: null,

  setDefaultImage: function(){
    var default_image = "/assets/images/default_user_image.jpg";
    this.set("src", default_image);
  },

  didInsertElement: function(){
    var _this = this;
    var state = _this.get("controller.model.state");

    //if image is not present
    if(!state && this.src === null) { this.setDefaultImage(); }

    this.$().on('error', function(){
      if(state === "under_review"){
        _this.get('controller').send('handleBrokenImage');
      }
      else{
        _this.setDefaultImage();
      }
    });
  },
});
