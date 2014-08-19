var mockjaxCustomHelpers = function() {
  Ember.Test.registerAsyncHelper('mockApi', function (app,reqtype, url, json) {
    $.mockjax({
      type: reqtype,
      url: url,
      status: 500,
      dataType: 'json',
      responseText: json
    });
  });
}();
export default mockjaxCustomHelpers;
