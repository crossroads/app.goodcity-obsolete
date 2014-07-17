import Ember from 'ember';

var Router = Ember.Router.extend({
  location: GoodcityENV.locationType
});

Router.map(function() {

  this.resource('tour', { path: '/tour/:tour_id' });

  this.resource('offers', function () {
    this.route('index', { path: '/'});
    this.route('new', { path: '/new'});

    this.resource('offer', { path: '/:offer_id'}, function() {
      this.route('index', { path: '/'});
      this.resource('items', function(){
        this.route('new');
        this.route('add_item');
        this.resource('item', { path: '/:item_id'});
      });
    });
  });

  this.resource('item_types');
  this.route('register');
  this.route('authenticate');
});

export default Router;
