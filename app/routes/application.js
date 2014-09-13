import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function () {
    var language = localStorage.language || Ember.I18n.default_language;
    Ember.I18n.translations = Ember.I18n.translation_store[language];
    CLDR.defaultLanguage = language;
  },

  renderTemplate: function() {
    this.render(); // default template
    this.render('messages/unread', {   // the template to render
      into: 'application',      // the template to render into
      outlet: 'unreadMessages',       // the name of the outlet in that template
      controller: 'messages/unread'   // the controller to use for the template
    });
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
