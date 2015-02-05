import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ["review_item", "offer", "sendMessage"],

  itemTypeId: Ember.computed.alias('controllers.review_item.itemTypeId'),

  isBlank: function(key, value){
    return (arguments.length >1) ? value : false;
  }.property(),

  noReasonSelected: function(key, value){
    return (arguments.length >1) ? value : false;
  }.property(),

  selectedId: function(key, value){
    this.set("isBlank", false);
    if(arguments.length > 1) {
      this.set('noReasonSelected', false);
      return value;
    } else {
      var reasonId = this.get('rejectionReason.id');
      if(reasonId) { return reasonId; }
      else {
        if(this.get("rejectReason") && this.get("rejectReason").length > 0) {
          return this.set("selectedId", "-1");
        }
      }
    }
  }.property('rejectionReason.id'),

  setCustomReason: function(){
    if(this.get("rejectReason") && this.get("rejectReason").length > 0) {
      this.set("selectedId", "-1");
    }
  }.observes('model.rejectReason'),

  rejectionOptions: function() {
    return this.store.all('rejection_reason').sortBy('id');
  }.property(),

  setRejectComments: function(){
    var reasonRecord = this.store.getById('rejection_reason', this.get('selectedId'));
    var reason = reasonRecord && reasonRecord.get('name');
    var message;
    switch(reason) {
      case "Quality": message = "Unfortunately we cannot receive this item. Some categories of items are very difficult for us to distribute unless they are in excellent condition."; break;
      case "Size" : message = "Unfortunately we cannot receive this item. Very few of our clients are able to accommodate large items in their homes."; break;
      case "Supply/Demand" : message = "Unfortunately we cannot receive this item because we have a large quantity already in stock."; break;
      default: message = "Unfortunately we cannot receive this item."; break;
    }
    this.set('rejectionComments', message);
  }.observes('selectedId'),

  actions: {
    setRejectOption: function(){
      this.set("selectedId", "-1");
    },

    clearRejectionComments: function(){
      this.set('rejectionComments', '');
    },

    rejectOffer: function(){
      var selectedReason = this.get('selectedId');
      if(selectedReason === undefined) {
        this.set('noReasonSelected', true);
        return false;
      }

      var rejectProperties = this.getProperties('rejectReason', 'rejectionComments');

      if(selectedReason === "-1" && Ember.$.trim(rejectProperties.rejectReason).length === 0) {
        this.set("isBlank", true);
        return false; }

      if(selectedReason !== "-1") {
        rejectProperties.rejectReason = null;
        this.set('rejectReason', null); }

      var loadingView = this.container.lookup('view:loading').append();
      rejectProperties.rejectionReason = this.store.getById('rejection_reason', selectedReason);
      rejectProperties.state_event = 'reject';

      var item_id = this.get('controllers.review_item.id');
      rejectProperties.id = item_id;

      var offer_id = this.get('controllers.offer').get('id');
      rejectProperties.offer = this.store.getById('offer', offer_id);
      rejectProperties.itemType = this.store.getById('item_type', this.get('itemTypeId'));

      // send message to donor
      this.get("controllers.sendMessage").send("sendRejectMessage", rejectProperties.rejectionComments);

      var item = this.store.push('item', rejectProperties);

      // Save changes to Item
      var route = this;
      item.save().then(function() {
        loadingView.destroy();
        route.transitionToRoute('review_offer.items');
      });
    },
  }

});
