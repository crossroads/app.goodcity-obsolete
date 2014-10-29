module.exports = function(app) {
  var express      = require('express');
  var offersRouter = express.Router();

  var image_url = "http://res.cloudinary.com/ddoadcjjl/image/upload/v1407764294/default/test_image.jpg";
  var image_id = "1407764294/default/test_image.jpg";

  var offers_json = {
    "offers": [
      { "id": "1", "state": "draft", "collection_contact_name": "TestOffer", "item_ids": ["1", "2"], "delivery_id": null },
      { "id": "2", "state": "draft", "delivery_id": null },
      { "id": "3", "language": "en", "state": "submitted", "collection_contact_name": "TestOffer",
        "created_by_id": "1", "item_ids": ["4"], "delivery_id": null, "reviewed_by_id": "2" }
    ],
    "items": [
      { "id": "1", "donor_description": "example1", "offer_id": "1", "image_ids": ["1", "2"] },
      { "id": "2", "donor_description": "example2", "offer_id": "1" },
      { "id": "4", "donor_description": "Velit fugit amet quos ut minima quis", "offer_id": "3", "donor_condition_id": "1", "image_ids": ["1"] }
    ],
    "images": [
      { "id": "1", "image_url": image_url, "thumb_image_url": image_url, "favourite": "false", "image_id": image_id },
      { "id": "2", "image_url": image_url, "thumb_image_url": image_url, "favourite": "true", "image_id": image_id }
    ],
    "donor_conditions": [
      { "id": 1, "name": "New" },
      { "id": 4, "name": "Broken" },
      { "id": 2, "name": "Lightly Used" },
      { "id": 3, "name": "Heavily Used" }
    ],
    "addresses": [
      { "id": 1, "street": null, "flat": null, "building": null, "district_id": null, "addressable_id": 14, "addressable_type": "User" }
    ],
    "messages": [
      { "id": "1", "body": "I have made an offer.", "state": null, "recipient_id": "2", "sender_id": "1", "is_private": false, "offer_id": "4", "item_id": null }
    ],
    "user": [
      { "id": "1", "first_name": "Kendrick", "last_name": "Kiehn", "mobile": "51111111","address_id": "1", "permission_id": null },
      { "id": "2", "first_name": "Jaleel", "last_name": "Ondricka", "mobile": "91111112","address_id": "1", "permission_id": "2" }
    ],
    "permissions":[
      { "id": "2", "name": "Supervisor" },
      { "id": "1", "name": "Reviewer" }
    ]
  };

  offersRouter.get("/", function(req, res) {
    res.send(offers_json);
  });

  offersRouter.delete("/:id", function(req, res) {
    res.send();
  });

  offersRouter.put("/:id", function(req, res) {
    res.send(offers_json);
  });

  offersRouter.post("/", function(req, res) {
    res.send({
      "offers": [ {"id": "3", "state": "draft" }]
    });
  });

  app.use("/api/v1/offers", offersRouter);
  app.use("/api/v1/offers/:id", offersRouter);

};
