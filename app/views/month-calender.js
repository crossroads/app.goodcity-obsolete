import Ember from 'ember';

export default Ember.TextField.extend({
  tagName: 'input',
  classNames: 'pickadate',
  attributeBindings: [ "name", "type", "value", "id", 'required', 'pattern', 'available' ],

  didInsertElement: function(){
    var _this = this;
    var list = this.get('available');
    var available_count = 0, available_array = [true];

    if(list) {
      available_count = list.length;
      for (var i = available_count - 1; i >= 0; i--) {
        var date = new Date(list[i]);
        var date_array = [];
        date_array.push(date.getFullYear());
        date_array.push(date.getMonth());
        date_array.push(date.getDate());
        available_array.push(date_array);
      }
    }

    Ember.$().ready(function(){
      Ember.$('.pickadate').pickadate({
        format: 'ddd mmm d',
        disable: available_array,
        min: new Date(),
        clear: false,
        today: false,
        close: false,

        onSet: function() {
          var date = this.get('select') && this.get('select').obj;
          _this.set("selection", date);
        },
        onStart: function(){
          var date = _this.get('selection');
          if(date) {
            this.set('select', new Date(date), { format: 'ddd mmm d' });
          }
        },
      });
    });

  }
});
