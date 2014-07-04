// Note: this is really just the same as ItemType but seems easier if we
// create a separate model for it here.
import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  name: attr('string'),
  code: attr('string')
});
