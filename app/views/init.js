import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    Ember.$(document).foundation({
      offcanvas: { close_on_click: true },
      joyride : {
        nub_position: 'top',
        tip_location_patterns: {
          top: ['bottom'],
        }
      }
    });
  }
});
