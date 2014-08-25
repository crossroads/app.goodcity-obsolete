import Ember from 'ember';

export default Ember.ArrayController.extend({

  powerUser: function () {
    var pending_offer = this.filterBy('state', 'draft');
    return (this.get('content.length') > pending_offer.length);
  }.property("content.@each.state")

});
