var express = require("express");
var router = express.Router();

// Load Orders model
const Order = require("../models/Orders");

// GET request
router.get("/", function (req, res) {
  Order.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// POST request: Add an order to DB
router.post("/addOrder", (req, res) => {
  const newOrder = new Order({
    ItemName: req.body.ItemName,
    Price: req.body.Price,
    Quantity: req.body.Quantity,
    VendorEmailId: req.body.VendorEmailId,
    BuyerEmailId: req.body.BuyerEmailId,
    OrderStatus: req.body.OrderStatus,
  });

  newOrder
    .save()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// POST request: get all orders of a buyer
router.post("/getBOrder", (req, res) => {
  Order.find({ BuyerEmailId: req.body.email }, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// POST request: get all orders for a vendor
router.post("/getVOrder", (req, res) => {
  Order.find({ VendorEmailId: req.body.email }, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.post("/getStatus", (req, res) => {
  Order.find({ _id: req.body.OrderId }, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// PUT request: Update the OrderStatus of an order
router.put("/updateStatus", (req, res) => {
  Order.updateOne(
    { _id: req.body.OrderId },
    { $set: { OrderStatus: req.body.OrderStatus } },
    function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.json(user);
      }
    }
  );
});

router.post("/top", function (req, res) {
  Order.find(
    { VendorEmailId: req.body.id, OrderStatus: "Completed" },
    function (err, orders) {
      if (err) {
        console.log(err);
      } else {
        var dict = {};
        orders.map((order) => {
          // console.log(order);
          // console.log(order.ItemName);
          if (dict[order.ItemName]) {
            dict[order.ItemName] += 1;
          } else {
            dict[order.ItemName] = 1;
          }
        });
        var items = Object.keys(dict).map(function (key) {
          return [key, dict[key]];
        });

        items.sort(function (first, second) {
          return second[1] - first[1];
        });
        res.json(items);
      }
    }
  );
});

router.post("/stat", function (req, res) {
  Order.count(
    { VendorEmailId: req.body.id, OrderStatus: "Completed" },
    function (err, count1) {
      if (err) {
        console.log(err);
      } else {
        Order.count(
          { VendorEmailId: req.body.id, OrderStatus: "Rejected" },
          function (err, count2) {
            if (err) {
              console.log(err);
            } else {
              Order.count(
                { VendorEmailId: req.body.id },
                function (err, count3) {
                  if (err) {
                    console.log(err);
                  } else {
                    res.json({
                      completed: count1,
                      rejected: count2,
                      total: count3,
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

module.exports = router;
