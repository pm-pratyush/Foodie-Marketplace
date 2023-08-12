var express = require("express");
var router = express.Router();

// Load User model
const Vendor = require("../models/Vendors");
const FoodItem = require("../models/FoodItems");

// GET request
router.get("/", function (req, res) {
  Vendor.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.post("/getItems", function (req, res) {
  FoodItem.find({ VendorEmailId: req.body.email }, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// POST request: Add a vendor to DB
router.post("/signup", (req, res) => {
  const newVendor = new Vendor({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    Password: req.body.Password,
    ShopName: req.body.ShopName,
    OpeningTime: req.body.OpeningTime,
    ClosingTime: req.body.ClosingTime,
  });

  newVendor
    .save()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// POST request: Add item to DB
router.post("/addItem", (req, res) => {
  const newFoodItem = new FoodItem({
    ItemName: req.body.ItemName,
    Price: req.body.Price,
    Quantity: req.body.Quantity,
    Type: req.body.Type,
    AddOns: req.body.AddOns,
    Image: req.body.Image,
    VendorEmailId: req.body.VendorEmailId,
    Rating: req.body.Rating,
    Tags: req.body.Tags,
  });
  console.log(newFoodItem);
  console.log(req.body);

  newFoodItem
    .save()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// PUT request: Edit an Item in DB
router.put("/editItem", (req, res) => {
  FoodItem.findOneAndUpdate(
    { _id: req.body.ItemId },
    {
      $set: {
        ItemName: req.body.ItemName,
        Price: req.body.Price,
        Quantity: req.body.Quantity,
        Type: req.body.Type,
        AddOns: req.body.AddOns,
        Image: req.body.Image,
        Tags: req.body.Tags,
      },
    },
    function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.json(user);
      }
    }
  );
});

router.put("/updateStatus", (req, res) => {
  FoodItem.findOneAndUpdate(
    { _id: req.body.ItemId },
    {
      $set: {
        Status: req.body.Status,
      },
    },
    function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.json(user);
      }
    }
  );
});

// DELETE request: Delete an item from DB
router.delete("/deleteItem", (req, res) => {
  FoodItem.findByIdAndDelete(req.body.id, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(user);
    }
  });
});

// POST request: Signin a vendor
router.post("/signin", (req, res) => {
  const email = req.body.email;
  Vendor.findOne({ Email: email }).then((user) => {
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
  Vendor.updateMany(
    { Email: req.body.Email },
    {
      $set: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Password: req.body.Password,
        ShopName: req.body.ShopName,
        OpeningTime: req.body.OpeningTime,
        ClosingTime: req.body.ClosingTime,
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

router.post("/getOpeningAndClosingTime", (req, res) => {
  Vendor.find({ Email: req.body.VendorEmailId }, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

module.exports = router;
