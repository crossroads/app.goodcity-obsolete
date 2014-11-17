import Ember from 'ember';
import DS from 'ember-data';
import Addressable from './addressable';

var attr = DS.attr;

export default Addressable.extend({
  firstName:   attr('string'),
  lastName:    attr('string'),
  mobile:      attr('string'),

  permission:  DS.belongsTo('permission'),

  isDonor: Ember.computed.empty("permission.name"),
  isStaff: Ember.computed.notEmpty("permission.name"),
  isReviewer: Ember.computed.equal("permission.name", "Reviewer"),
  isSupervisor: Ember.computed.equal("permission.name", "Supervisor"),

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
