import Ember from 'ember';

export default Ember.TextField.extend({
  tagName: 'input',
  classNames: 'pickadate',
  attributeBindings: [ "name", "type", "value", "id", 'required', 'pattern', 'holidays' ],

  didInsertElement: function(){
    var list = this.get('holidays');
    var holidays_array = [];
    var holidays_count = 0;

    if(list) {
      holidays_count = list.length;
      for (var i = holidays_count - 1; i >= 0; i--) {
        var date = new Date(list[i]);
        var date_array = [];
        date_array.push(date.getFullYear());
        date_array.push(date.getMonth());
        date_array.push(date.getDate());
        holidays_array.push(date_array);
      }
    }

    holidays_array.push(1, 2);

    var _this = this;
    Ember.$().ready(function(){
      Ember.$('.pickadate').pickadate({
        format: 'ddd mmm d',
        disable: holidays_array,
        min: new Date(),
        max: 14 + holidays_count,
        clear: false,
        today: false,
        close: false,
        editable: true,

        onSet: function() {
          var date = this.get('select') && this.get('select').obj;
          _this.set("selection", date);
        },
        onStart: function(){
          this.open();
          var date = _this.get('selection');
          if(date) {
            this.set('select', new Date(date), { format: 'ddd mmm d' });
          }
        },
        onClose: function() {
          this.open();
        },
      });
    });

  }
});
