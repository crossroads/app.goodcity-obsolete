import DS from 'ember-data';
import Addressable from './addressable';

var attr = DS.attr,
  hasMany = DS.hasMany;

var User = Addressable.extend({
  firstName:   attr('string'),
  lastName:    attr('string'),
  mobile:      attr('string'),

  messages:      hasMany('message', { inverse: 'recipient', async: true } ),
  sent_messages: hasMany('message', { inverse: 'sender', async: true } ),
  offers:        hasMany('offer'),
  permissions:   hasMany('permission'),

  isReviewer: function() {
    var roles = this.get('permissions');
    var reviewer = roles.filterBy('name', 'Reviewer');
    return reviewer.length === 0 ? false : true;
  }.property(),

  image: function(){
    return false; //"assets/images/default_item.jpg";
  }.property(),

  nameInitial: function(){
    return this.get('firstName').charAt(0).capitalize();
  }.property('firstName'),

  roleSign: function(){
    return this.get('isReviewer') ? "(v)" : "(d)";
  }.property()
});

export default User;
