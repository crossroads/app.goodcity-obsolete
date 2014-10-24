import Ember from 'ember';

export default Ember.View.extend({

  notifyMessage: function(){
    Ember.run.next(this, this.animateNotification);
  }.observes('controller.mostRecent').on('didInsertElement'),

  animateNotification: function(){
    Ember.$('.unread_message_box').show();
    Ember.$('.unread_message_box').animate({"left": "2%"}, "slow");

    window.setTimeout(function() {
      Ember.$('.unread_message_box').fadeOut('slow');
      Ember.$('.unread_message_box').animate({"left": "0"});
    }, 6000);
  }
});
