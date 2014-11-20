import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'input',
  classNames: 'pickadate',
  type: 'text',

  didInsertElement: function(){
    Ember.$().ready(function(){
      Ember.$('.pickadate').pickadate({
        format: 'ddd mmm d',
        // Disable Sundays, Mondays, 27-november-2014
        disable: [ 1, 2, new Date(2014,10,28) ],
        clear: false,
        today: false,
        close: false,
      });
    });
  }
});
