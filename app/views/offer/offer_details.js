import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    var currentView = this;
    Ember.$(document).foundation('joyride', 'start');

    Ember.$().ready(function(){
      cloudinaryError(currentView);
    });

    function cloudinaryError(currentView){
      Ember.$('.reviewer-avatar').on("error", function(){
        currentView.get('controller').send('handleBrokenImage');
      });
    }
  },

});


