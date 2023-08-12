var express = require("express");
var router = express.Router();

const Buyer = require("../models/Buyers");

router.get("/", function (req, res) {
  Buyer.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.put("/addAmount", (req, res) => {
  Buyer.updateMany(
    { Email: req.body.Email },
    { $set: { WalletAmount: req.body.WalletAmount } },
    function (err, wallet) {
      if (err) {
        console.log(err);
      } else {
        res.json(wallet);
      }
    }
  );
});

router.put("/redAmount", (req, res) => {
  Buyer.updateMany(
    { Email: req.body.Email },
    { $set: { WalletAmount: req.body.WalletAmount } },
    function (err, wallet) {
      if (err) {
        console.log(err);
      } else {
        res.json(wallet);
      }
    }
  );
});

module.exports = router;
