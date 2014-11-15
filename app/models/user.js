import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  firstName:   attr('string'),
  lastName:    attr('string'),

  permission:  DS.belongsTo('permission'),

  nameInitial: function() {
    return this.get('firstName').charAt(0).capitalize();
  }.property('firstName'),

  roleInitials: function(){
    return this.get('isDonor') ? "(D)" :
      "("+ this.get("permission.name").capitalize().charAt(0) +")";
  }.property('permission')
});
