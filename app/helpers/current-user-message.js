import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(user, message) {
  return message.get('sender') === user;
});
