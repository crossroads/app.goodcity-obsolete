import DS from 'ember-data';
import Addressable from './addressable';

var attr = DS.attr,
  hasMany = DS.hasMany,
  belongsTo = DS.belongsTo;

export default Addressable.extend({
  firstName:   attr('string'),
  lastName:    attr('string'),
  mobile:      attr('string'),
  fullName:    attr('string'),
  district:    attr('string'),

  messages:    hasMany('message'),
  offers:      hasMany('offer'),
  permissions: hasMany('permission'),

  isReviewer: function() {
    var roles = this.get('permissions');
    var reviewer = roles.filterBy('name', 'Reviewer');
    return reviewer.length;
  }.property(),

  image: function(){
    return "assets/images/default_item.jpg";
  }.property()
});
