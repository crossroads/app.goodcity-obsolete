import DS from 'ember-data';
import Ember from 'ember';

var Adapter;
if(window.GoodcityENV.environment === "test") {
  Adapter = DS.ActiveModelAdapter.extend({
    namespace: GoodcityENV.APP.NAMESPACE,
    // headers: {
    //   "Authorization":  'Bearer ' + jwt_token ,
    //   "Accept-Language": Ember.I18n.translations.language
    // }
  });
} else {
  Adapter = DS.ActiveModelAdapter.extend({
    headers: {
      "Authorization":  'Bearer ' + (localStorage.jwt === undefined ? localStorage.step1_token : localStorage.jwt),
      "Accept-Language": Ember.I18n.translations.language
    }
    // ,
    // ajax: function(url, type, hash) {
    //   if (this.headers !== undefined) {
    //     var headers = this.headers;
    //     hash.beforeSend = function (xhr) {
    //       Ember.keys(headers).forEach(function(key) {
    //         xhr.setRequestHeader(key, headers[key]);
    //       });
    //     };
    //   }
    // return this._super(url, type, hash);
    // }
  });

  DS.ActiveModelAdapter.reopen({
    namespace: GoodcityENV.APP.NAMESPACE,
    host:      GoodcityENV.APP.API_HOST_URL,
  });

}

// tokenChanged: function() {
//     this.get('token')=='' ? localStorage.removeItem('token') : localStorage.token = this.get('token');
//     $.ajaxPrefilter(function(options, originalOptions, xhr) {
//       var token = localStorage.jwt === undefined ? localStorage.step1_token : localStorage.jwt
//         return xhr.setRequestHeader('Authorization',  'Bearer ' + token);
//     });

// }.observes('localStorage.jwt');

export default Adapter;
