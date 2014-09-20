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
  permission:    belongsTo('permission'),

  image: function(){
    return false; //"assets/images/default_item.jpg";
  }.property(),

  nameInitial: function(){
    return this.get('firstName').charAt(0).capitalize();
  }.property('firstName'),

  roleInitials: function(){
    return this.get('isDonor') ? "(D)" : "("+ this.get("permission.name").capitalize().charAt(0) +")";
  }.property('permission'),

  isDonor: function(){
    var permission = this.get('permission');
    return Ember.empty(permission);
  }.property('permission'),

  isStaff: function(){
    var permission = this.get('permission');
    return !Ember.empty(permission);
  }.property('permission'),

  isReviewer: function(){
    var permission_name = this.get('permission.name');
    return permission_name === "Reviewer";
  }.property('permission'),

  isSupervisor: function(){
    var permission_name = this.get('permission.name');
    return permission_name === "Supervisor";
  }.property('permission'),

  subscriptions: function() {
    var channels = {};
    if(this.get('isDonor')) {
      var userChannelName = "user_" + this.get('id');
      channels[userChannelName] = ['message'];
    }
    if((this.get('isReviewer')) || (this.get('isSupervisor'))) {
      channels['reviewer'] = ['message'];
      channels['supervisor'] = ['message'];
    }
    return channels;
  }.property('permission'),

});

export default User;
