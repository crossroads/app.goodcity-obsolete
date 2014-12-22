module.exports = function(app) {
  var express = require('express');
  var gogovanTransportTypesRouter = express.Router();
  gogovanTransportTypesRouter.get('/', function(req, res) {
    res.send({
      "gogovan_transport_types": [{ "id": 1, "name": "Van" },{"id": 2,"name": "5.5t Truck"},{"id": 3,"name": "Disable"}]
    });
  });
  app.use('/api/v1/gogovan_transport_types', gogovanTransportTypesRouter);
};
