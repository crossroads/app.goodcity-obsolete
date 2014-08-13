import Ember from "ember";

export default {
  name: 'i18n',
  initialize: function() {

    CLDR.defaultLanguage = 'en';
    Ember.I18n.translation_store = Ember.I18n.translation_store || {};
    Ember.I18n.default_language = 'en';

  }
};
