import Init from './init';
export default Init.extend({
  hammerOptions: {
    swipe_velocity: 0.5
  },
  gestures: {
    swipeLeft: function() {
      this.get("controller").send("showNextImage");
    },

    swipeRight: function() {
      this.get("controller").send("showPreviousImage");
    }
  }
});
