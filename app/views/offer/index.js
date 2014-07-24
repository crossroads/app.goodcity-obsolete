import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function(){

    Ember.$().ready(function (){
      Ember.$('.removeItem').on('click', function(){
        return confirm("Are you sure? This cannot be undone.");
      });
    });

  }
});
