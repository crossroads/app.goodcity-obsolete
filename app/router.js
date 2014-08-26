import Ember from 'ember';

var Router = Ember.Router.extend({
  location: GoodcityENV.locationType
});

Router.map(function() {
  this.resource('tour', { path: '/tour/:tour_id' });
  this.resource('i18n', { path: '/i18n' });
  this.resource('logout', { path: '/logout' });

  this.resource('offers', function () {
    this.route('index', { path: '/'});
    this.route('new', { path: '/new'});

    this.resource('offer', { path: '/:offer_id'}, function() {
      this.route('index', { path: '/'});
      this.route('confirm');
      this.route('submit');
      this.route('review_status');
      this.route('plan_delivery');
      this.route('donation_details');
      this.route('book_timeslot');
      this.route('contact_details');

      this.resource('items', function(){
        this.route('new');
        this.route('add_item');
        this.resource('item', { path: '/:item_id'}, function(){
          this.route('edit');
          this.route('edit_images');
        });
      });
    });
  });

  this.resource('item_types');
  this.route('register');
  this.route('login');
  this.route('resend');
  this.route('authenticate');
  this.route('territories');
  this.route('districts');
});

export default Router;
