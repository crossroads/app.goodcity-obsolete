import Ember from "ember";

export default {
  name: 'i18n-en',
  initialize: function() {

    Ember.I18n.translation_store = Ember.I18n.translation_store || {};
  
    Ember.I18n.translation_store['en'] = {
      'language': 'en',
      'items.heading': 'Items',
      'item.title.one': 'One item',
      'item.title.other': '{{count}} items',
      'item.new.title': 'New item'
    };
    
    // this is how we set default language
    Ember.I18n.translations = Ember.I18n.translation_store['en'];

  }
};