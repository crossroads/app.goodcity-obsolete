import DS from 'ember-data';
import Addressable from './addressable';

var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTo;

export default Addressable.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  mobile:  attr('string'),
  district:  belongsTo('district'),
  messages:  hasMany('message'),
  offers:  hasMany('offer'),
  permissions: hasMany('permission'),

  isReviewer: function() {
    var roles = this.get('permissions');
    var reviewer = roles.filterBy('name', 'Reviewer');
    return reviewer.length;
  }.property()
});
