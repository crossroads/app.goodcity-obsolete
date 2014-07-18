import Ember from "ember";

export default {
  name: 'i18n-en',
  initialize: function() {

    Ember.I18n.translations['en'] = {
      'language': 'en',
      'user.edit.title': 'Edit User'
    };
    
    // this is how we set default language
    Ember.I18n.translations = Ember.I18n.translations['en'];

  }
};