import Ember from 'ember';

export default Ember.TextField.extend({
  tagName: 'input',
  classNames: 'pickadate',
  attributeBindings: [ "name", "type", "value", "id", 'required', 'pattern' ],

  didInsertElement: function(){
    var _this = this;
    Ember.$().ready(function(){
      Ember.$('.pickadate').pickadate({
        format: 'ddd mmm d',

        // Disable Sundays, Mondays, 25-december-2014
        disable: [ 1, 2, [2014,11,25] ],
        min: new Date(),
        clear: false,
        today: false,
        close: false,
        // editable: true,
        onSet: function() {
          var date = this.get('select') && this.get('select').obj;
          _this.set("selection", date);
        },
        onStart: function(){
          var date = _this.get('selection');
          if(date) {
            this.set('select', new Date(date), { format: 'ddd mmm d' });
          }
        }
      });
    });

  }
});
