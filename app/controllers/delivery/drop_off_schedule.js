import Ember from 'ember';
import AjaxPromise from './../../utils/ajax-promise';

export default Ember.ObjectController.extend({
  needs: ["delivery", "offer"],

  slots: [ {id: 1, name: "9AM-11PM"}, {id: 2, name: "11AM-1PM" }, {id: 3, name: "2PM-4PM"}, {id: 4, name: "4PM-6PM"} ],
  selectedId: 2,
  selectedDate: null,

  available_dates: function(key, value){
    if (arguments.length > 1) {
      return value;
    } else {
      var _this = this;
      new AjaxPromise("/available_dates", "GET", this.get('session.authToken'))
      .then(function(data) {
        _this.set("available_dates", data);
        value = data;
      });
      return value;
    }
  }.property('available_dates.[]'),

  actions: {
    bookSchedule: function() {
      var loadingView = this.container.lookup('view:loading').append();

      var _this = this;
      var selectedSlot = _this.get('selectedId');
      var date = _this.get('selectedDate');
      var slotName = _this.get('slots').filterBy('id', parseInt(selectedSlot)).get('firstObject.name');

      var scheduleProperties = { slot: selectedSlot, scheduledAt: date, slotName: slotName};

      var bookedSchedule = _this.store.createRecord('schedule', scheduleProperties);
      var deliveryId = _this.get('controllers.delivery').get('id');
      var offerId = _this.get('controllers.offer').get('id');

      bookedSchedule.save().then(function(schedule) {
        var delivery = _this.store.update('delivery', {
            id: deliveryId,
            schedule: schedule,
            offer: offerId
        });
        delivery.save().then(function(){
          loadingView.destroy();
          _this.transitionToRoute('delivery.donation_details');
        });
      });
    }
  }
});
