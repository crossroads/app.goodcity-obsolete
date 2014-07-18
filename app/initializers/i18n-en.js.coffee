`import Ember from "ember";`

I18nTranslationsEn = 
  name: 'i18n-en'
  initialize: ->

    Ember.I18n.translation_store = Ember.I18n.translation_store || {}

    Ember.I18n.translation_store.en = 
      'language': 'en'
      'items.heading': 'Items'
      'item.title.one': 'One item'
      'item.title.other': '{{count}} items'
      'item.new.title': 'New item'
      'i18n.pluralisation': 'Pluralisation'
    
    # this is how we set default language
    Ember.I18n.translations = Ember.I18n.translation_store.en

`export default I18nTranslationsEn;`
