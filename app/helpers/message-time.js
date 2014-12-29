import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(value) {
  return value ? moment(Date.parse(value)).format('HH:mm') : "";
});
