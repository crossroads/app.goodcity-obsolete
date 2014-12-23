import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['offer/index'],

  user: function(){
    var userId = this.session.get("currentUser.id");
    return this.store.getById('user_profile', userId);
  }.property().volatile(),

  confirmedItems: function(){
    var items = this.get('offer.items');
    return items && items.filterBy('state', 'accepted');
  }.property('offer.items.@each.state'),

  userName: function(){
    return this.get('contact.name') || this.get("user.fullName");
  }.property('contact.name', 'user'),

  userMobile: function(){
    return this.get('contact.mobile') || this.get("user.mobile");
  }.property('contact.mobile', 'user'),

  isDeleting: function(key, value){
    if (arguments.length > 1) {
      return value;
    } else {
      return this.get('offer') ? this.get('offer.isDeleted') : true;
    }
  }.property('offer'),

  actions:{
    cancelOffer: function(offer){
      this.get('controllers.offer/index').send('cancelOffer', offer);
    }
  }
});
