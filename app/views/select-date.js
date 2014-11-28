import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'input',
  classNames: 'pickadate',
  attributeBindings: [ "name", "type", "value", "id" ],

  didInsertElement: function(){
    var _this = this;
    Ember.$().ready(function(){
      Ember.$('.pickadate').pickadate({
        format: 'ddd mmm d',
        // Disable Sundays, Mondays, 4-december-2014
        disable: [ 1, 2, [2014,11,4] ],
        min: new Date(),
        clear: false,
        today: false,
        close: false,
        onSet: function() {
          var date = this.get('select') && this.get('select').obj;
          _this.set("selection", date);
        }
      });
    });
  }
});
