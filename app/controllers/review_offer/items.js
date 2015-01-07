// import Ember from 'ember';

// export default Ember.ArrayController.extend({

//   needs: ['offer'],

//   offer: Ember.computed.alias('controllers.offer'),

//   accepted: Ember.computed.filterBy('content', 'state', 'accepted'),
//   awaitingReview: Ember.computed.filterBy('content', 'state', 'submitted'),
//   rejected: Ember.computed.filterBy('content', 'state', 'rejected'),

//   actions: {
//     startReview: function() {
//       var offer = this.store.getById('offer', this.get('offer.id'));
//       var adapter = this.container.lookup('adapter:application');
//       var url = adapter.buildURL('offer', offer.get('id')) + '/review';
//       var controller = this;

//       adapter.ajax(url, 'PUT').then(function(response) {
//         offer.set('reviewedAt', response.offer.reviewed_at);
//         controller.store.find('user', response.offer.reviewed_by_id).then(function(reviewer){
//             offer.set('reviewedBy', reviewer);
//         });
//       });
//     }
//   }

// });

import offerDetails from './../offer/offer_details';

export default offerDetails.extend({

  staffPage: true,

});

