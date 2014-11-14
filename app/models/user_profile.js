import Ember from 'ember';
import DS from 'ember-data';
import Addressable from './addressable';
import UserPermission from './user_permission';

var attr = DS.attr;

export default Addressable.extend(UserPermission, {
  firstName:   attr('string'),
  lastName:    attr('string'),
  mobile:      attr('string'),

  image: function(){
    return false; //"assets/images/default_item.jpg";
  }.property(),

  nameInitial: function(){
    return this.get('firstName').charAt(0).capitalize();
  }.property('firstName'),

  subscriptions: function() {
    var channels = {};
    var events = ["update_store","notification"];
    channels["user_" + this.get('id')] = events;
    if (this.get("isReviewer")) {
      channels["reviewer"] = events;
    } else if (this.get("isSupervisor")) {
      channels["supervisor"] = events;
    }
    return channels;
  }.property()

});
