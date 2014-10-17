import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function () {
    var language = localStorage.language || Ember.I18n.default_language;
    Ember.I18n.translations = Ember.I18n.translation_store[language];
    CLDR.defaultLanguage = language;
  },

  renderTemplate: function() {
    if(this.controllerFor('application').get('isLoggedIn')) {
      this.render('application');
    } else {
      this.render('home');
    }
  },

  actions: {
    setLang: function(language) {
      Ember.I18n.translations = Ember.I18n.translation_store[language];
      CLDR.defaultLanguage = language;
      localStorage.language = language;
      window.location.reload();
    }
  }

});
