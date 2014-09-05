import DS from 'ember-data';
import Addressable from './addressable';

var attr = DS.attr,
  hasMany = DS.hasMany;

export default Addressable.extend({
  firstName:   attr('string'),
  lastName:    attr('string'),
  mobile:      attr('string'),

  messages:    hasMany('message'),
  offers:      hasMany('offer'),
  permissions: hasMany('permission'),

  isReviewer: function() {
    var roles = this.get('permissions');
    var reviewer = roles.filterBy('name', 'Reviewer');
    return reviewer.length;
  }.property(),

  image: function(){
    return false; //"assets/images/default_item.jpg";
  }.property(),

  fullName: function(){
    var name = this.get('firstName').capitalize() + " " + this.get('lastName').capitalize();
    return name;
  }.property('firstName', 'lastName'),

  nameInitial: function(){
    return this.get('firstName').charAt(0).capitalize();
  }.property('firstName'),
});
