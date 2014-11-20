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
        // Disable Sundays, Mondays, 28-november-2014
        disable: [ 1, 2, [2014,10,28] ],
        min: new Date(),
        clear: false,
        today: false,
        close: false,
        onSet: function(context) {
          _this.set("selection", this.get("select").obj);
        }
      });
    });
  }
});
