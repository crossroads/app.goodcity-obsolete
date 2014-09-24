import Ember from 'ember';

export default Ember.ArrayController.extend({
  arrangedContent: Ember.computed.sort('content', function (a, b) {
    //sort by has unread messages then by reviewedAt descending
    if (a.get('unreadMessageCount') > 0 && b.get('unreadMessageCount') === 0) {
      return -1;
    }
    else if (a.get('unreadMessageCount') === 0 && b.get('unreadMessageCount') > 0) {
      return 1;
    }
    else if (a.get('reviewedAt') > b.get('reviewedAt')) {
      return -1;
    }
    else {
      return 1;
    }
  })
});
