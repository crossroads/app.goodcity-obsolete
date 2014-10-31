import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function () {
    var language = localStorage.language || Ember.I18n.default_language;
    Ember.I18n.translations = Ember.I18n.translation_store[language];
    CLDR.defaultLanguage = language;
  },

  renderTemplate: function() {
    this.render(); // default template
    if(this.controllerFor('application').get("isLoggedIn")){
      this.render('notifications', {   // the template to render
        into: 'application',      // the template to render into
        outlet: 'notifications', // the name of the outlet in that template
        controller: 'notifications'   // the controller to use for the template
      });

      this.render('messages/unreadMessageCount', {
        into: 'application',
        outlet: 'unreadMessageCount',
        controller: 'messages/unread'
      });
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
