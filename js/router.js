App.Router.map(function() {
  this.resource('offer', { path: '/' });

  this.resource('items', { path: '/items' }, function(){
    this.route('new');
  });
});

App.OfferRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('item');
  },
});
