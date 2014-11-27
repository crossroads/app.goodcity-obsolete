import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  name: attr('string'),
  code: attr('string'),
  parentId: attr('number'),

  text: "",
  nameChanged: function() {
    this.set("text", this.get("name"));
  }.observes("name").on("init")
});
