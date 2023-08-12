const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 5000;
const DB_NAME = "DASS_DB1";

// routes
var BuyerRouter = require("./routes/routeBuyers");
var VendorRouter = require("./routes/routeVendors");
var WalletRouter = require("./routes/routeWallet");
var OrderRouter = require("./routes/routeOrders");
var FavouriteRouter = require("./routes/routeFavourites");
var ItemRouter = require("./routes/routeItems");  

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect(process.env.MONGODB_URI , {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully !");
});

// setup API endpoints
app.use("/item", ItemRouter);
app.use("/order", OrderRouter);
app.use("/buyer", BuyerRouter);
app.use("/vendor", VendorRouter);
app.use("/wallet", WalletRouter);
app.use("/favourite", FavouriteRouter);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
