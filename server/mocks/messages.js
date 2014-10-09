module.exports = function(app) {
  var express = require('express');
  var messagesRouter = express.Router();

  messagesRouter.get('/', function(req, res) {
    res.send({"messages": []});
  });

  app.use('/api/v1/messages', messagesRouter);
};
