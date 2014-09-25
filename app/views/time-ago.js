import Ember from 'ember';

export default Ember.View.extend({
  template: Ember.Handlebars.compile("<time class='timeago' {{bind-attr datetime='view.timeString'}}> Right Now </time>"),

  timeValue: new Date,

  didInsertElement: function() {

    Ember.$().ready(function (){
      Ember.$('time.timeago').timeago();

      // update every minute
      setInterval((function() {
        return Ember.$("time.timeago").timeago();
      }), 60000);

    });
  },

  timeString: function(){
    var time = this.timeValue.toString();
    return (new Date(time).toISOString());
  }.property()

});
