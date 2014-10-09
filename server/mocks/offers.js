module.exports = function(app) {
  var express      = require('express');
  var offersRouter = express.Router();

  var image_url = "http://res.cloudinary.com/ddoadcjjl/image/upload/v1407764294/default/test_image.jpg";
  var image_id = "1407764294/default/test_image.jpg";

  var offers_json = {
    "offers": [ {"id": "1", "state": "draft", "collection_contact_name": 'TestOffer', "item_ids": ["1", "2"] },
      {"id": "2", "state": "draft"} ],
    "items": [{"id": "1", "donor_description":'example1', "offer_id": "1", "image_ids": ["1", "2"]}, {"id": "2", "offer_id": "1"}],
    "images": [{"id": "1", "image_url": image_url, "thumb_image_url": image_url, "favourite": "false", "order": 1, "image_id": image_id },
      {"id": "2", "image_url": image_url, "thumb_image_url": image_url, "favourite": "true", "order": 1, "image_id": image_id }],
    "donor_conditions": [{ "id": 1, "name": "New" },{"id": 4,"name": "Broken"},{"id": 2,"name": "Lightly Used"},{"id": 3,"name": "Heavily Used"}]

  };

  offersRouter.get('/', function(req, res) {
    res.send(offers_json);
  });

  offersRouter.delete('/:id', function(req, res) {
    res.send();
  });

  offersRouter.put('/:id', function(req, res) {
    res.send(offers_json);
  });

  offersRouter.post('/', function(req, res) {
    res.send({
      "offers": [ {"id": "3", "state": "draft" }]
    });
  });

  app.use('/api/v1/offers', offersRouter);
  app.use('/api/v1/offers/:id', offersRouter);
};