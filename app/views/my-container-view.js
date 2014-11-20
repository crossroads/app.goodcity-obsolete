import Ember from 'ember';

var MyContainerView = Ember.ContainerView.extend({
    classNames: ["row"],
    childViews: ['staticView'],
    staticView:  Ember.View.create({
      templateName: "packages/static_component",
      id: 0
    })
});
export default MyContainerView;
