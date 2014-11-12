import Ember from 'ember';

var addChildViewButton = Ember.View.extend({
    tagName: 'div',
    className: 'row',
    render: function(buffer) {
      var dataHtml = "<span class='small-2 columns text-right'><i class='fa fa-plus-circle fa-2x icon icon-center'></i></span><span class='small-8 columns link-blue'>Add Component</span><span class='small-2 columns'>&nbsp;</span>";
      buffer.push(dataHtml);
    },
    click: function() {
      var containerView = Ember.View.views['my_container_view'];
      var childView = containerView.createChildView( Ember.View, {
        templateName: 'review_item/add_component'
      });
      // containerView.get('childViews');
      containerView.pushObject(childView);
    }
});
export default addChildViewButton;
