import Ember from "ember";

export default Ember.View.extend({

  didInsertElement: function(){
    Ember.$(document).foundation({
     tab: {
        callback : function (tab) {},
      }
    });
  }
});
