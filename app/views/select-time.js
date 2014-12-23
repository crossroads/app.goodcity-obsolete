import Ember from 'ember';

export default Ember.TextField.extend({
  tagName: 'input',
  classNames: 'timepicker',
  attributeBindings: [ "name", "type", "value", "id", 'required', 'pattern' ],

  didInsertElement: function(){
    var _this = this;
    Ember.$().ready(function(){
      Ember.$('.timepicker').pickatime({
        clear: '',
        min: [8,30],
        max: [16,0],
        // editable: true,
        onSet: function() {
          var slot = this.get("select") && this.get("select").time;
          _this.set("selection", slot);
        },
        onStart: function(){
          var slot = _this.get('selection');
          if(slot) {
            this.set('select', slot);
          }
        }
      });
    });
  }
});
