import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({

  beforeModel: function() {
    var route = this;
    this.store.find('offer').then(function(my_offers){
      var count = my_offers.get('length');
      if ( count === 0) {
        route.transitionTo('offers.new');
      } else {
        if (count === 1 && my_offers.get('firstObject.state') === 'draft') {
          route.transitionTo('offer', my_offers.get('firstObject.id'));
        }
      }
    });
  },

  model: function() {
    return this.store.find('offer');
  }
});
