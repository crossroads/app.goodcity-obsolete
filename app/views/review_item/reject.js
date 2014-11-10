import Ember from 'ember';

export default Ember.View.extend({

  didInsertElement: function(){

    Ember.$().ready(function (){
      validate_fields();
      submitForm();
    });

    function validate_fields(){
      Ember.$('#rejectReason').focusout(function(){
        return isValid();
      });
      Ember.$('#rejectReason').focus(function(){
        remove_highlight();
      });
    }

    function submitForm(){
      Ember.$('.rejectOffer').click(function(){
        var selectedReason = Ember.$("input[name=selectReason]:checked").val() || false;
        return (isValid() && selectedReason);
      });
    }

    function isValid(){
      var reason = Ember.$('#rejectReason').val();
      if (reason && reason.length > 0) {
        remove_highlight();
        return true;
      }
      else{
        highlight_field();
        return false;
      }
    }

    function highlight_field(){
      Ember.$('#rejectReason').addClass('error');
    }

    function remove_highlight(){
     Ember.$("#rejectReason").removeClass('error');
    }
  }

});
