import Ember from "ember";

export default Ember.ObjectController.extend({

  actions: {
    removeItem: function(item) {
      var offer = item.get('offer');
      if(offer.get('itemCount') > 1) {
        if(confirm(Ember.I18n.t("item.delete_confirm"))) {
          item.get('offer.items').removeObject(item);
          item.destroyRecord();
          this.transitionToRoute("offer.offer_details");
        }
      } else {
        alert(Ember.I18n.t("item.cant_delete_last_item"));
      }
    }
  }
});
