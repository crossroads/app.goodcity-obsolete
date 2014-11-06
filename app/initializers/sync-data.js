export default {
  name: 'sync-data',
  after: 'store',
  initialize: function(container, application) {
    application.deferReadiness();
    var store = container.lookup('store:main');
    store.findById('message', 1);
    store.find('offer').finally(function() {
      application.advanceReadiness();
    });
    store.find('territory');
    store.find('item_type');
  }
};
