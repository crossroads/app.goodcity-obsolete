import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({

  model: function() {
    return this.store.all('offer');
  },

  afterModel: function(my_offers) {
    var route = this;
    switch(my_offers.get('length')) {
      case 0 : route.transitionTo('offers.new'); break;
      case 1 :
        if(my_offers.get('firstObject.state') === 'draft') {
          route.transitionTo('offer', my_offers.get('firstObject'));
        }
    }
  },

  renderTemplate: function() {
    this.render(); // default template
    this.render('appMenuList', {
      into: 'offers/index',
      outlet: 'appMenuList',
      controller: 'application'
    });
  }

});
