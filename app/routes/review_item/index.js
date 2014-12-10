import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  staffRestricted: true,

  model: function(params) {
    return this.transitionTo('review_item.accept');
  }

});
