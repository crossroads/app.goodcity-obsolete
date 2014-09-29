import Ember from 'ember';

export default Ember.View.extend({

  didInsertElement: function(){
    Ember.$().ready(function (){
      removeHighlight();
      verifyFormInput();
    });

    function verifyFormInput(){
      Ember.$(".submitForm").click(function(){

        var formInputs = ['#userName', '#mobile', '#street', '#building', '#flat', '.ember-select.district'];
        Ember.$.each(formInputs, function(index, value) {
          if(Ember.$(value).val().length < 1) {
            Ember.$(value).addClass('invalid_input');
          }
        });

        if(Ember.$('.invalid_input').length > 0) {
          return false;
        }
      });
    }

    function removeHighlight(){
      Ember.$('#mobile, #userName, #street, #building, #flat, .ember-select.district').focus(function(){
        Ember.$(this).removeClass('invalid_input');
      });
    }
  }
});
