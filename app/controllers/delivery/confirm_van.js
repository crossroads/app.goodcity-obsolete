import Ember from 'ember';

export default Ember.ObjectController.extend({

  user: Ember.computed.alias('session.currentUser'),

  orderDetails: function() {
    return this.store.all('gogovan_order').get('lastObject');
  }.property(),

  actions: {
    // confirmOrder: {
    //
    // }
  }
});
