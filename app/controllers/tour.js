import Ember from 'ember';

export default Ember.Controller.extend({

  // this is the name of the tour partial to call
  tourStep: function () {
    return 'tour/' + this.get('model');
  }.property('model'),

  nextStep: function () {
    return this.get('model') + 1;
  }.property('model'),

  lastStep: function() {
    return this.get('model') === 5;
  }.property('model')

});
