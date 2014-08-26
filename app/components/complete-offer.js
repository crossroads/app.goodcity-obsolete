import Ember from 'ember';

//~ {{complete-offer offer=this}}

export default Ember.Component.extend({

  tagName: 'span',

  isDraft: function() {
    return this.get('offer.state') === 'draft';
  }.property('offer.state'),

});
