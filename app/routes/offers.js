import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({

  beforeModel: function() {
    this._super();
    var route = this;
    this.store.find('offer').then(function(my_offers){
      switch(my_offers.get('length')) {
        case 0 : route.transitionTo('offers.new'); break;
        case 1 :
          if(my_offers.get('firstObject.state') === 'draft') {
            route.transitionTo('offer', my_offers.get('firstObject.id'));
          }
      }
    });
  },

  model: function() {
    return this.store.find('offer');
  }
});
