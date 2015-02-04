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
        min: [10,0], // start from 10 AM
        max: [16,0], // end at 4 PM

        onSet: function() {
          var slot = this.get("select") && this.get("select").time;
          _this.set("selection", slot);
        },
        onStart: function(){
          var slot = _this.get('selection');
          if(slot) {
            this.set('select', slot);
          }
        },
        onOpen: function() {
          var selectedDate = Ember.$('.pickadate').val();
          var currentDate = new Date();
          var currentYear = currentDate.getFullYear().toString();
          selectedDate = new Date(selectedDate + " " + currentYear);
          currentDate.setHours(0,0,0,0);

          if(selectedDate.getTime() === currentDate.getTime()) {
            var currentTime = new Date();
            var hours = currentTime.getHours();
            var minutes = currentTime.getMinutes();
            minutes = minutes > 30 ? 30 : 0;
            this.set('disable', [{ from: [9,0], to: [hours, minutes] }]);
          } else {
            this.set('enable', true);
            this.set('enable', [{ from: [10,0], to: [16, 0] }]);
          }
        },
      });
    });
  }
});
