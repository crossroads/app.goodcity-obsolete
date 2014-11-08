import Ember from "ember";

export default Ember.Component.extend({
  tagName: "input",
  type:    "text",
  name:    "userName",
  value:   '',
  classNames: 'fullUserName',
  attributeBindings: [ "name", "type", "id", "value"],

  _initialze: function(){
    var user = this.get('user');
    var translatedName = Ember.I18n.t("full_name", { firstName: user.get('firstName'), lastName: user.get('lastName') });
    Ember.$('.fullUserName').attr("value", translatedName);
    Ember.$('.fullUserName').attr("id", 'userName');
  }.on('didInsertElement')
});
