import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ["offer"],

  name: function(){
    return this.get('controllers.offer').get('userName');
  }.property(),

  mobile: function(){
    return this.get('controllers.offer').get('userPhone');
  }.property(),

  actions: {
    saveContactDetails: function() {
      var addressProperties = this.getProperties('street', 'flat', 'building');
      var address = this.store.createRecord('address', addressProperties);

      var contactProperties = this.getProperties('name', 'mobile');
      var contact = this.store.createRecord('contact', contactProperties);

      // Save the new model
      var route = this;
      address.save().then(function() {
        contact.save().then(function(contact) {
          route.transitionToRoute('offer.thank_offer');
        });
      });
    }
  }
});
