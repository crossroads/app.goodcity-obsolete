import Ember from 'ember';

export default Ember.View.extend({

  notifyMessage: function(){
    Ember.run.next(this, this.animateNotification);
  }.observes('controller.mostRecent').on('didInsertElement'),

  timeoutId: 0,

  animateNotification: function(){
    clearTimeout(this.get('timeoutId'));
    var box = Ember.$('.notification_box').hide();
    box.slideDown();
    var id = window.setTimeout(function() { box.slideUp(); }, 6000);
    this.set('timeoutId', id);
  }
});
