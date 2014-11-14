import Ember from 'ember';

var sendMessage = Ember.ArrayController.extend({

  needs: ["offer", "review_item"],
  sortProperties: ['createdAt'],
  sortAscending: true,

  invalidMessage: function() {
    return Ember.isBlank(this.get('body'));
  }.property('body'),

  addError: function(key, value){
    return (arguments.length > 1) ? value : false;
  }.property(),

  actions: {
    removeError: function(){
      this.set("addError", false);
    },

    sendMessage: function(is_private, for_item) {
      if(this.get("invalidMessage")) {
        this.set("addError", true);
        return false;
      }

      var offer_id = this.get('controllers.offer').get('id');
      var offer = this.store.getById('offer', offer_id);

      var newMessageProperties = this.getProperties('body');
      newMessageProperties.offer = offer;
      newMessageProperties.isPrivate = is_private;
      newMessageProperties.createdAt = Date.now();

      if(for_item) {
        var item_id = this.get('controllers.review_item.id');
        var item = this.store.getById('item', item_id);
        newMessageProperties.item = item;
      }

      this.set('body', '');

      var message = this.store.createRecord('message', newMessageProperties);
      message.save();
    }
  }

});

export default sendMessage;
