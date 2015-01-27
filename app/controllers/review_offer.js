import Ember from 'ember';

export default Ember.ObjectController.extend({
  offer: Ember.computed.alias('model'),

  actions: {
    startReview: function() {
      var offer = this.store.getById('offer', this.get('offer.id'));
      var adapter = this.container.lookup('adapter:application');
      var url = adapter.buildURL('offer', offer.get('id')) + '/review';
      var controller = this;

      adapter.ajax(url, 'PUT').then(function(response) {
        controller.store.pushPayload(response);
      });
    }
  }
});
