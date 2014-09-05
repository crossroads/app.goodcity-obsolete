import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ["delivery"],
  isSelected: 1,
  actions: {
    assignSchedule: function() {
      var _this = this;
      var selectedSlot = _this.get('isSelected');
      var retrieveSelectedSchedule = _this.store.all('schedule').findBy("id", selectedSlot);
      var scheduleProperties = retrieveSelectedSchedule.getProperties('zone',
                                'resource','scheduled_at',
                                'slot', 'slot_name');
      var bookedSchedule = _this.store.createRecord('schedule', scheduleProperties);
      var deliveryDetails = _this.get('controllers.delivery').getProperties('id',
                              'offerId');

      bookedSchedule.save().then(function(schedule) {
        var delivery = _this.store.update('delivery', {
            id: deliveryDetails.id,
            schedule: schedule,
            offer: deliveryDetails.offerId
        });
        delivery.save().then(function(){
          _this.transitionToRoute('delivery.contact_details');
        });
      });
    }
  }
});
