import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['delivery'],

  contact: function(key, value) {
    if(arguments.length > 1) {
      return value;
    } else {
      var _this = this;
      var deliveryId = _this.get('controllers.delivery.id');
      _this.store.find('delivery', deliveryId).then(function(delivery){
        value = delivery.get('contact');
        _this.set('contact', value);
      });
      return value;
    }
  }.property('delivery.[]'),

  actions:{
    done: function(){
      this.transitionToRoute('offers.index');
    }
  }
});
