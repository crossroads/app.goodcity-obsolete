export default Ember.Test.registerAsyncHelper('mockApi', function (app,reqtype, url, json) {
  $.mockjax({
    type: reqtype,
    url: url,
    dataType: 'json',
    responseText: json
  });
});
