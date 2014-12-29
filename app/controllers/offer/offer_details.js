import Ember from 'ember';

export default Ember.ObjectController.extend({

  sortedItems: Ember.computed.sort('model.items', function (a, b) {
    //sort by has unread messages and then by read messages
    if(a.get('lastDisplayMessage.id') > 0 && b.get('lastDisplayMessage.id') === 0) {
      return -1;
    }
    else if (a.get('lastDisplayMessage.id') === 0 && b.get('lastDisplayMessage.id') > 0) {
      return 1;
    }
    else if (a.get('lastDisplayMessage.id') > b.get('lastDisplayMessage.id')) {
      return -1;
    }
    else {
      return 1;
    }
  })

});
