module.exports = function(app) {
  var express = require('express');
  var authRouter = express.Router();

  authRouter.get('/check_mobile', function(req, res) {
    res.send({"is_unique_mobile":true});
  });

  authRouter.post('/signup', function(req, res) {
    res.send({"token":"zdrpfxseg3w2ykvi","message":"Success"});
  });

  authRouter.get('/resend', function(req, res) {
    res.send({"mobile_exist":true,"token":"zdrpfxseg3w2ykvi"});
  });

  authRouter.post('/verify', function(req, res){
    res.send({"jwt_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0MDkwNDA0MTQsImlzcyI6Ikdvb2RDaXR5SEsiLCJleHAiOjE0MTAyNTAwMTQsIm1vYmlsZSI6Iis4NTI2MTA5MjAwMSIsIm90cF9zZWNyZXRfa2V5IjoiemRycGZ4c2VnM3cyeWt2aSJ9.0nokBv047aUR-xcilAOwudkkHyQem47L7vYiO6irvKE"});
  });

  app.use('/api/v1/auth/', authRouter);
};
