import Ember from "ember";

export default Ember.View.extend({
  notifyMessage: function(){
    Ember.run.once(this, this.animateNotification);
  }.observes("controller.[]").on("didInsertElement"),

  animateNotification: function(){
    var box = Ember.$(".contain-to-grid");
    var notification = this.get("controller.nextNotification");
    if (!notification) { box.hide(); return; }
    if (box.is(":hidden")) {
      box.slideDown();
      Ember.run.later(this, this.removeNotification, box, notification, 6000);
    }
  },

  removeNotification: function(box, notification) {
    var controller = this.get("controller");
    var remove = function() { controller.removeObject(notification); };
    var newNotification = controller.retrieveNotification(1);
    if (newNotification) {
      remove();
      Ember.run.later(this, this.removeNotification, box, newNotification, 6000);
    } else {
      box.slideUp(400, remove);
    }
  }
});
