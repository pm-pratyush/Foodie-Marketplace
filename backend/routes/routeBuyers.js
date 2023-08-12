var express = require("express");
var router = express.Router();

// Load User model
const Buyer = require("../models/Buyers");

// GET request
router.get("/", function (req, res) {
  Buyer.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// POST request: Add a buyer to DB
router.post("/signup", (req, res) => {
  const newBuyer = new Buyer({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    Password: req.body.Password,
    Contact: req.body.Contact,
    Age: req.body.Age,
    BatchName: req.body.BatchName,
    WalletAmount: 0,
  });

  newBuyer
    .save()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// POST request: Signin a buyer
router.post("/signin", (req, res) => {
  const email = req.body.email;
  Buyer.findOne({ Email: email }).then((user) => {
    if (!user) {
      return res.status(404).json({
        error: "Email-not-found",
      });
    } else {
      // res.send("Email Found");
      return res.json({
        message: "Successfully logged in",
        user: user,
      });
    }
  });
});

router.put("/editProfile", (req, res) => {
  Buyer.updateMany(
    { Email: req.body.Email },
    {
      $set: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Password: req.body.Password,
        Contact: req.body.Contact,
        Age: req.body.Age,
        BatchName: req.body.BatchName,
      },
    },
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
