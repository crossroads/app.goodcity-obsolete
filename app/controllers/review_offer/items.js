import Ember from 'ember';

export default Ember.ArrayController.extend({

  needs: ['offer'],

  offer: Ember.computed.alias('controllers.offer'),

  actions: {
    startReview: function() {
      var offer = this.store.getById('offer', this.get('offer.id'));
      var adapter = this.container.lookup('adapter:application');
      var url = adapter.buildURL('offer', offer.get('id')) + '/review';
      var controller = this;

      adapter.ajax(url, 'PUT').then(function(response) {
        offer.set('reviewedAt', response.offer.reviewed_at );
        controller.store.find('user', response.offer.reviewed_by_id).then(function(reviewer){
            offer.set('reviewedBy', reviewer);
        });
      });
    }
  }

});
