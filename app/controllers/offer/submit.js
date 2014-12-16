import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    submitOffer: function(saleable) {
      var loadingView = this.container.lookup('view:loading').append();
      var offer = this.store.update('offer', {
        id: this.get('id'),
        state_event: 'submit',
        saleable: saleable
      });

      var route = this;

      offer.save().then(function() {
        loadingView.destroy();
        route.transitionToRoute('offer.review_status');
      });
    }
  }
});
