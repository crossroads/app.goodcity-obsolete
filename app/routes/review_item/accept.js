import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,

  renderTemplate: function() {
    this.render();
    this.render('packages', {
      into: 'review_item/accept',
      outlet: 'packages',
      controller: 'packages'
    });
  },

  model: function() {
  }

});
