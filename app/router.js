import Ember from 'ember';

var Router = Ember.Router.extend({
  location: GoodcityENV.locationType
});

Router.map(function() {
  this.resource('offers', function () {
    this.route('index', { path: '/'});
    this.route('offer', { path: '/:offer_id'});
  });

  this.resource('items', { path: '/items' }, function(){
    this.route('new');
  });

  this.resource('item_types');
});

export default Router;
