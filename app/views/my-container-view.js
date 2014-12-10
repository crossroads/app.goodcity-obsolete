import Ember from 'ember';

var MyContainerView = Ember.ContainerView.extend({
  classNames: ["row"],
  childViews: Ember.computed.alias('staticView'),

  staticView:  function(){
    var view;
    if(this.get('noPackages') && this.get('noSubItemType')) {
      view = Ember.View.create({
        templateName: "packages/static_component",
        id: 0
      });
    }
    return view ? [view] : [];
  }.property(),
});

export default MyContainerView;
