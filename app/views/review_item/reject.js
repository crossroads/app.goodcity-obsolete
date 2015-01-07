import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    var view = this;

    Ember.$().ready(function(){
      Ember.$("#rejectReason").click(function(){
        view.get('controller').send('setRejectOption');
      });
    });
  }
});
