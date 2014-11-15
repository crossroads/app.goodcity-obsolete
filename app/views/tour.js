import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function(){
    Ember.$().ready(function(){
      Ember.$('.tour_slides').slick({
        dots: true,
        autoplay: true,
        adaptiveHeight: true,
        speed: 300,
        arrows: false,
        touchMove: true,
        swipe: true,
        onAfterChange: function(){
          if(this.currentSlide === 4){
            this.autoPlayClear();
          }
        }
      });
    });
  }
});
