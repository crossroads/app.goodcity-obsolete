import Ember from 'ember';

var Router = Ember.Router.extend({
  location: GoodcityENV.locationType
});

Router.map(function() {

  this.resource('offers', function () {
    this.route('index', { path: '/'});

    this.resource('offer', { path: '/:offer_id'}, function() {
      this.route('index', { path: '/'});
      this.resource('items', function(){
        this.route('new');
        this.resource('item', { path: '/:item_id'});
      });
    });
  });

  this.resource('item_types');
});

export default Router;
