import Ember from 'ember';

export default Ember.Mixin.create({
  markMessageAsRead: function(message) {
    var adapter = this.container.lookup('adapter:application');
    var url = adapter.buildURL('message', message.id) + '/mark_read';
    adapter.ajax(url, 'PUT').then(function(response) {
      message.setProperties(response.message);
    });
  },
});
