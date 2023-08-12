var express = require("express");
var router = express.Router();

// Load Favourites model
const Favourite = require("../models/Favourites");

// GET request
router.get("/", function (req, res) {
  Favourite.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// POST request: Add an Favourite to DB
router.post("/addFavourite", (req, res) => {
  const newFavourite = new Favourite({
    ItemName: req.body.ItemName,
    Price: req.body.Price,
    Rating: req.body.Rating,
    VendorEmailId: req.body.VendorEmailId,
    BuyerEmailId: req.body.BuyerEmailId,
  });

  newFavourite
    .save()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// POST request: get all Favourites of a buyer
router.post("/getBFavourite", (req, res) => {
  Favourite.find({ BuyerEmailId: req.body.email }, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.post("/findP", (req, res) => {
  // To find on basis of BuyerEmailId and ItemName
  Favourite.find(
    { ItemName: req.body.ItemName, BuyerEmailId: req.body.BuyerEmailId },
    function (err, users) {
      if (err) {
        console.log(err);
      } else {
        res.json(users);
      }
    }
  );
});

module.exports = router;
