import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'input',
  classNames: 'timepicker',
  type: 'text',

  didInsertElement: function(){
    Ember.$().ready(function(){
      Ember.$('.timepicker').pickatime({
        clear: '',
        min: [8,30],
        max: [18,0]
      });
    });
  }
});
