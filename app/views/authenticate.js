import Ember from 'ember';

export default Ember.View.extend({

  didInsertElement: function(){

    Ember.$().ready(function (){
      set_button_visiblity();
      Ember.$('#pin').keyup(set_button_visiblity);
    });

    function set_button_visiblity(){
      var filled = Ember.$('#pin').length > 0 && Ember.$('#pin').val().length >0;
      Ember.$("button").prop("disabled", !filled);
    }
  }

});
