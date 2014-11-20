import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'input',
  classNames: 'timepicker',
  attributeBindings: [ "name", "type", "value", "id" ],

  didInsertElement: function(){
    var _this = this;
    Ember.$().ready(function(){
      Ember.$('.timepicker').pickatime({
        clear: '',
        min: [8,30],
        max: [18,0],
        onSet: function() {
          _this.set("selection", this.get("select").time);
        }
      });
    });
  }
});
