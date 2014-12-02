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
        max: [16,0],
        onSet: function() {
          var slot = this.get("select") && this.get("select").time;
          _this.set("selection", slot);
        }
      });
    });
  }
});
