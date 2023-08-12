const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for Buyers
const BuyerSchema = new Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Contact: {
    type: String,
    required: true,
    unique: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  BatchName: {
    type: String,
    required: true,
  },
  WalletAmount: {
    type: Number,
  },
  UserType: {
    type: String,
    default: "Buyer",
  },
});

module.exports = Buyer = mongoose.model("Buyers", BuyerSchema);
