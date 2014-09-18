import Ember from 'ember';
import DS from 'ember-data';
import Addressable from './addressable';

var attr = DS.attr,
  hasMany = DS.hasMany,
  belongsTo = DS.belongsTo;

var User = Addressable.extend({
  firstName:   attr('string'),
  lastName:    attr('string'),
  mobile:      attr('string'),

  messages:      hasMany('message', { inverse: 'recipient', async: true } ),
  sent_messages: hasMany('message', { inverse: 'sender', async: true } ),
  offers:        hasMany('offer'),
  permission:   belongsTo('permission'),

  isReviewer: function(){
    var _this = this.get('permission');
    return Ember.empty(_this) ? false : true;
  }.property(),

  image: function(){
    return false; //"assets/images/default_item.jpg";
  }.property(),

  nameInitial: function(){
    return this.get('firstName').charAt(0).capitalize();
  }.property('firstName'),

  roleInitials: function(){
    var _this = this.get('permission');
    return Ember.empty(_this) ? "(D)" : "("+ _this.get("name").capitalize().charAt(0) +")";
  }.property()

});

export default User;
