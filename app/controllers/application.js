import Ember from 'ember';

export default Ember.ObjectController.extend({

  isLoggedIn: function(key, value) {
    return (arguments.length > 1 ? value : (localStorage.jwt === undefined ? false : true));
  }.property(),

  currentLanguage: function() {
    return Ember.I18n.translations.language;
  }.property(),

  actions: {
    logMeOut: function(){
      delete localStorage.jwt;
      delete localStorage.step1_token;
      this.set("isLoggedIn", false);
      this.transitionToRoute('login');
    },
    logMeIn: function(){
      this.set("isLoggedIn", true);
    }
  }
});
