import Ember from 'ember';

export default Ember.ObjectController.extend({
  contact: function() {
    return this.content._data;
  }.property(),

  contactName: function() {
    return this.get('contact.name');
  }.property(),

  contactMobile: function() {
    return this.get('contact.mobile');
  }.property()
});
