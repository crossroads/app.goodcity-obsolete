import Ember from 'ember';

export default Ember.View.extend({

  didInsertElement: function(){

    Ember.$().ready(function() {
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
    });

  }

});
