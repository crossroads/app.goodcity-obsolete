import Ember from 'ember';

var MyContainerView = Ember.ContainerView.extend({
    classNames: ["row"],
    childViews: ['staticView'],
    staticView:  function(){
      return Ember.View.create({
        templateName: "packages/static_component",
        id: 0
      });
    }.property(),
});
export default MyContainerView;
