import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
  permission:    DS.belongsTo('permission'),

  roleInitials: function(){
    return this.get('isDonor') ? "(D)" :
      "("+ this.get("permission.name").capitalize().charAt(0) +")";
  }.property('permission'),

  isDonor: Ember.computed.empty("permission.name"),
  isStaff: Ember.computed.notEmpty("permission.name"),
  isReviewer: Ember.computed.equal("permission.name", "Reviewer"),
  isSupervisor: Ember.computed.equal("permission.name", "Supervisor")
});
