import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function(){

    Ember.$().ready(function (){
      Ember.$('.removeRecord').on('click', function(){
        return confirm("Are you sure? This cannot be undone.");
      });
    });

  }
});
