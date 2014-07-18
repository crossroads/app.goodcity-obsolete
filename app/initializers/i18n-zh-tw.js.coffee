`import Ember from "ember";`

I18nTranslationsZhTw =
  name: 'i18n-zh-tw'
  initialize: ->

    Ember.I18n.translation_store = Ember.I18n.translation_store || {}
    
    Ember.I18n.translation_store['zh-tw'] =
      'language': 'zh-tw'
      'items.heading': '項'
      'item.title.one': '一個項目'
      'item.title.other': '{{count}} 項'
      'item.new.title': '新項目'
      'i18n.pluralisation': '的複數'

`export default I18nTranslationsZhTw;`