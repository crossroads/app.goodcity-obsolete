import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'img',
  attributeBindings:['src'],
  src: null,

  didInsertElement: function(){
    var _this = this;
    var state = _this.get("controller.model.state");
    if(state === "under_review"){
      this.$().on('error', function(){
        _this.get('controller').send('handleBrokenImage');
      });
    }
  },
});
