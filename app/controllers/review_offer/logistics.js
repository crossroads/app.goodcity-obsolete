import Ember from 'ember';
import AjaxPromise from './../../utils/ajax-promise';

export default Ember.ObjectController.extend({

  selectedGogovanOption: null,
  selectedCrossroadsOption: null,

  accepted: Ember.computed.filterBy('items', 'state', 'accepted'),
  pendingItem: Ember.computed.filterBy('items', 'state', 'submitted'),

  gogovanOptions: function() {
    return this.store.all('gogovan_transport_type');
  }.property(),

  crossroadsOptions: function() {
    return this.store.all('crossroads_transport_type');
  }.property(),

  actions: {

    completeReview: function() {
      var gogovanOption = this.get('selectedGogovanOption');
      var crossroadsOption = this.get('selectedCrossroadsOption.name');
      var loadingView = this.container.lookup('view:loading').append();

      var offerProperties = {
        gogovan_transport: gogovanOption,
        crossroads_transport: crossroadsOption,
        state_event: 'finish_review',
        id: this.get('id') };

      var route = this;
      var url   = "/offers/" + this.get('id') + "/complete_review";

      new AjaxPromise(url, "PUT", this.get('session.authToken'), {offer: offerProperties}).then(function(data) {
        route.store.pushPayload(data);
        loadingView.destroy();
        route.transitionToRoute('review_offer.items');
      });
    }
  }
});
