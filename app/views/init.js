import Ember from 'ember';

var Init = Ember.View.extend({

  didInsertElement: function(){

    Ember.$(document).foundation({
      offcanvas: {
        close_on_click: true
      }
    });

    Ember.$().ready(function() {
      var btmButtons = function() {

       Ember.$(".with-btm").css('height', 'auto');

        var windowHeight = Ember.$(window).height();
        var tabBarHeight = Ember.$(".tab-bar").outerHeight(true);
        var mainSectionHeight = Ember.$(".with-btm").outerHeight();
        var contentHeight = tabBarHeight + mainSectionHeight;
        //var btmHeight = Ember.$(".btm").outerHeight();

        if (windowHeight > contentHeight) {
          Ember.$(".with-btm").outerHeight(windowHeight-tabBarHeight);
        }

      };

      btmButtons();
      Ember.$(window).resize(btmButtons);
    });
  }
});

export default Init;
