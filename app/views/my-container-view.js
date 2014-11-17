import Ember from 'ember';

var MyContainerView = Ember.ContainerView.extend({

    childViews: ['staticView'],
    staticView:  Ember.View.create({
      templateName: "packages/static_component"
    }),

  // removerOnClick: function(){
    // var view = this, childViews = this.get('childViews');
    // this.get('childViews').forEach(function(_view) {
      // view.removeChild(_view);
      // _view.remove();
      // view.set("data-width", _view.get("width"));
    // });

});
export default MyContainerView;
