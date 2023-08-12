var express = require("express");
var router = express.Router();

// Load FoodItem model
const FoodItem = require("../models/FoodItems");

// GET request
router.get("/", function (req, res) {
  FoodItem.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// POST request: Search an Item by name
router.post("/search", (req, res) => {
  var search = req.body.search;
  // console.log(search);

  if (search === "") {
    FoodItem.find(function (err, users) {
      if (err) {
        console.log(err);
      } else {
        res.json(users);
      }
    });
  } else {
    search = search.toLowerCase();
    FoodItem.find(
      { ItemName: { $regex: search, $options: "i" } },
      function (err, users) {
        if (err) {
          console.log(err);
        } else {
          res.json(users);
        }
      }
    );
  }
});

// POST request: Sort by Price
router.post("/sortByPriceA", (req, res) => {
  var search = req.body.search;
  // console.log(search);

  if (search === "") {
    FoodItem.find(function (err, users) {
      users.sort(function (a, b) {
        return a.Price - b.Price;
      });
      if (err) {
        console.log(err);
      } else {
        res.json(users);
      }
    });
  } else {
    search = search.toLowerCase();
    FoodItem.find(
      { ItemName: { $regex: search, $options: "i" } },
      function (err, users) {
        users.sort(function (a, b) {
          return a.Price - b.Price;
        });
        if (err) {
          console.log(err);
        } else {
          res.json(users);
        }
      }
    );
  }
});

router.post("/sortByPriceD", (req, res) => {
  var search = req.body.search;
  // console.log(search);

  if (search === "") {
    FoodItem.find(function (err, users) {
      users.sort(function (a, b) {
        return b.Price - a.Price;
      });
      if (err) {
        console.log(err);
      } else {
        res.json(users);
      }
    });
  } else {
    search = search.toLowerCase();
    FoodItem.find(
      { ItemName: { $regex: search, $options: "i" } },
      function (err, users) {
        users.sort(function (a, b) {
          return b.Price - a.Price;
        });
        if (err) {
          console.log(err);
        } else {
          res.json(users);
        }
      }
    );
  }
});

// POST request: Sort by Rating
router.post("/sortByRatingA", (req, res) => {
  var search = req.body.search;
  // console.log(search);

  if (search === "") {
    FoodItem.find(function (err, users) {
      users.sort(function (a, b) {
        return a.Rating - b.Rating;
      });
      if (err) {
        console.log(err);
      } else {
        res.json(users);
      }
    });
  } else {
    search = search.toLowerCase();
    FoodItem.find(
      { ItemName: { $regex: search, $options: "i" } },
      function (err, users) {
        users.sort(function (a, b) {
          return a.Rating - b.Rating;
        });
        if (err) {
          console.log(err);
        } else {
          res.json(users);
        }
      }
    );
  }
});

router.post("/sortByRatingD", (req, res) => {
  var search = req.body.search;
  // console.log(search);

  if (search === "") {
    FoodItem.find(function (err, users) {
      users.sort(function (a, b) {
        return b.Rating - a.Rating;
      });
      if (err) {
        console.log(err);
      } else {
        res.json(users);
      }
    });
  } else {
    search = search.toLowerCase();
    FoodItem.find(
      { ItemName: { $regex: search, $options: "i" } },
      function (err, users) {
        users.sort(function (a, b) {
          return b.Rating - a.Rating;
        });
        if (err) {
          console.log(err);
        } else {
          res.json(users);
        }
      }
    );
  }
});

// PUT request: Update Quantity
router.put("/updateQuantity", (req, res) => {
  FoodItem.findOneAndUpdate(
    { _id: req.body.ItemId },
    {
      $set: {
        Quantity: req.body.Quantity,
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

module.exports = router;
