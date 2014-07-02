import Ember from 'ember';

var Router = Ember.Router.extend({
  location: GoodcityENV.locationType
});

Router.map(function() {
  this.resource('offer', { path: '/' });
  this.resource('items', { path: '/items' }, function(){
    this.route('new');
  });
});

export default Router;
