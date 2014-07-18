import Ember from "ember";

export default {
  name: 'i18n-zh-tw',
  initialize: function() {

    Ember.I18n.translations['zh-tw'] = {
      'language': 'zh-tw',
      'user.edit.title': "chinese text"
    };

  }
};
