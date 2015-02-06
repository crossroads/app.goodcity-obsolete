import Ember from "ember";

export default Ember.View.extend({
  timer: 0,

  initView: function() {
    Ember.$(".notification_box").hide();
  }.on("didInsertElement"),

  notifyMessage: function(){
    if (this.get("controller.length") > 0) {
      Ember.run.once(this, this.animateNotification);
    }
  }.observes("controller.[]"),

  animateNotification: function(){
    Ember.run.cancel(this.get("timer"));
    var notification = this.get("controller.nextNotification");
    var box = Ember.$(".notification_box");
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
