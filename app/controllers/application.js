import Ember from 'ember';

export default Ember.Controller.extend({
  
  currentLanguage: function() {
    return Ember.I18n.translations.language;
  }.property()
  
});
