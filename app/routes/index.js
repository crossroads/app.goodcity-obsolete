import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    setLang: function(language) {
      //Ember.I18n.translations = Ember.I18n.translations[language];
      console.log('(IndexRoute) setLanguage: ' + language);
    }
  }
  
});
