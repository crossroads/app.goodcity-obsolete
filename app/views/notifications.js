import Ember from "ember";

export default Ember.View.extend({
  timer: 0,

  notifyMessage: function(){
    Ember.run.once(this, this.animateNotification);
  }.observes("controller.[]").on("didInsertElement"),

  animateNotification: function(){
    Ember.run.cancel(this.get("timer"));
    var box = Ember.$('.contain-to-grid');
    var notification = this.get("controller.nextNotification");
    if (!notification) { box.hide(); return; }
    if (box.is(":hidden")) { box.slideDown(); }
    var controller = this.get("controller");
    var removeNotification = function() {
      if (controller.get("length") === 1) {
        box.slideUp(400, Ember.run.bind(this, function() { controller.removeObject(notification); }));
      } else {
        controller.removeObject(notification);
      }
    };
    this.set("timer", Ember.run.later(this, removeNotification, 6000));
  }
});
