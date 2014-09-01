import userFactory from '../fixtures/user';
var customHelpers = function() {
 Ember.Test.registerAsyncHelper('loginUser', function (app, url) {
    var hk_user;
    hk_user = FactoryGuy.build('with_hk_mobile');
    var jwt_token = window.localStorage.jwt;
    // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0MDkwMzgzNjUsImlzcyI6Ikdvb2RDaXR5SEsiLCJleHAiOjE0MTAyNDc5NjUsIm1vYmlsZSI6Iis4NTI2MTA5MjAwMSIsIm90cF9zZWNyZXRfa2V5IjoiemRycGZ4c2VnM3cyeWt2aSJ9.lZQaME1oKw7E5cdfks0jG3A_gxlOZ7VfUVG4IMJbc08";
    visit(url);
    fillIn('input#mobile', hk_user.mobile);
    click($("#getsmscode")[0]);
    andThen(function(){
      equal(currentURL(), "/authenticate");
      fillIn('input#pin', "123456");
      click($("#submit_pin")[0]);
      window.localStorage.jwt  = jwt_token;
    });
 });

 Ember.Test.registerAsyncHelper('logoutUser', function (app, url) {
    visit(url);
    var ele_logout = $("a:contains('Logout')");
    if(ele_logout.length > 0){
      click(ele_logout[0]);
    }
 });

}();

export default customHelpers;
