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
    if(this.get('isDonor')) {
      return "(D)";
    } else {
      var permission = this.get("permission.name") || "Donor";
      return "("+ permission.capitalize().charAt(0) +")";
    }
  }.property('permission'),

  fullName: function(){
    return (this.get('firstName') + " " + this.get('lastName'));
  }.property('firstName', 'lastName')
});
