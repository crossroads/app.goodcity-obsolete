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
        min: [10,0],
        max: [16,0],
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

            if(minutes > 30) {
              hours += 1; minutes = 0;
            } else {
              minutes = 30;
            }

            var totalMins = hours*60 + minutes;

            this.set('min', {hour: hours, mins: minutes, time: totalMins, pick: totalMins});
            this.set('select', null);
          } else {
            this.set('min', {hour: 10, mins: 0, time: 600, pick: 600});
          }
        },
      });
    });
  }
});
