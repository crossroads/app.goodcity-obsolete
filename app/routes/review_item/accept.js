import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,

  model: function() {
    return this.paramsFor('review_item').item_id;
  },

  setupController: function(controller, item) {
    controller.set('model', item);
  },

  renderTemplate: function() {
    this.render();
    this.render('packages', {
      into: 'review_item/accept',
      outlet: 'packages',
      controller: 'packages'
    });
  },
});
