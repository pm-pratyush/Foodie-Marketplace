const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for Vendors
const VendorSchema = new Schema({
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
  ShopName: {
    type: String,
    required: true,
    unique: true,
  },
  OpeningTime: {
    type: String,
    required: true,
  },
  ClosingTime: {
    type: String,
    required: true,
  },
  UserType: {
    type: String,
    default: "Vendor",
  },
});

module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
