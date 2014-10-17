import Ember from 'ember';

export default Ember.View.extend({

  didInsertElement: function(){

    Ember.$(document).foundation();

    Ember.$(document).ready(function() {
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

      var addPhoto = function() {

       Ember.$(".frame-in").css('height', 'auto');
        Ember.$(".frame-overlay").css('margin-left', '0');
        Ember.$(".frame-overlay").css('margin-top', '0');

        var frameWidth = Ember.$(".frame-in").width();
        var frameHeight = Ember.$(".frame-in").height();
        var overlayWidth = -(Ember.$(".frame-overlay").outerWidth(true) / 2);
        var overlayHeight = -(Ember.$(".frame-overlay").outerHeight(true) / 2);

        if (frameWidth > frameHeight) {
          Ember.$(".frame-in").height(frameWidth);
        }

        Ember.$(".frame-overlay").css('margin-left', overlayWidth);
        Ember.$(".frame-overlay").css('margin-top', overlayHeight);

      };

      addPhoto();
      Ember.$(window).resize(addPhoto);

      btmButtons();
      Ember.$(window).resize(btmButtons);

    });

  }

});
