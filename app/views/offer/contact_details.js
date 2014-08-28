import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function(){

    Ember.$().ready(function (){
      set_button_visiblity();
      Ember.$('input').keyup(set_button_visiblity);
      Ember.$('select.district').change(set_button_visiblity);
    });

    function set_button_visiblity(){
      var filled = true;
      Ember.$('input, select.district').each(function(){
        if(this.value.length === 0) {
          filled = false;
        }
      });

      Ember.$("button").prop("disabled", !filled);
    }
  }
});
