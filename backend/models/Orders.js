const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for
const OrderSchema = new Schema({
  Date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  ItemName: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  VendorEmailId: {
    type: String,
    required: true,
  },
  BuyerEmailId: {
    type: String,
    required: true,
  },
  OrderStatus: {
    type: String,
    default: "Placed",
  },
});

module.exports = Order = mongoose.model("Order", OrderSchema);
