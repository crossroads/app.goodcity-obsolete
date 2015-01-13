import Ember from 'ember';

export default Ember.ObjectController.extend({
  user: function(){
    var userId = this.session.get("currentUser.id");
    return this.store.getById('user_profile', userId);
  }.property().volatile(),

  userName: function(){
    return this.get('contact.name') || this.get("user.fullName");
  }.property('contact.name', 'user'),

  userMobile: function(){
    return this.get('contact.mobile') || this.get("user.mobile");
  }.property('contact.mobile', 'user'),
});
