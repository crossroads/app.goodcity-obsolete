import Ember from 'ember';
import '../../computed/local-storage';

export default Ember.View.extend({
  cloudinaryError: function() {
    var _this = this;
    Ember.$('.reviewer-avatar').on("error", function(){
      _this.send('handleBrokenImage');
    });
  },

  offerStateDidChange: function() {
    var _this = this;
    var state = _this.get("controller.model.state");
    if(state === "under_review"){
      setTimeout(function(){
        _this.cloudinaryError();
      }, 1);
    }
  }.observes('controller.model.state'),

  didInsertElement: function() {
    var _this = this;

    Ember.$(document).foundation({
      joyride : {
        modal: true,
        nub_position: 'top',
        tip_animation_fade_speed: 1300,
        tip_animation: 'fade',
        tip_location_patterns: {
          top: ['bottom'],
        },
        post_ride_callback: function(){
          _this.get("controller").set("joyrideSeen", true); }
      }
    }).foundation('joyride', 'start');
  },

  actions: {
    handleBrokenImage: function() {
      this.get("controller.reviewedBy").set("displayImageUrl", null);
    },
  }
});


