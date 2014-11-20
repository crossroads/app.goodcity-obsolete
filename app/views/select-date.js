import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'input',
  classNames: 'pickadate',

  didInsertElement: function(){
    Ember.$().ready(function(){
      Ember.$('.pickadate').pickadate({
        format: 'ddd mmm d',
        // Disable Sundays, Mondays, 28-november-2014
        disable: [ 1, 2, [2014,10,28] ],
        clear: false,
        today: false,
        close: false,
      });
    });
  }
});
