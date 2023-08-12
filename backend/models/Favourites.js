const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for
const FavouriteSchema = new Schema({
  ItemName: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Rating: {
    type: Number,
  },
  VendorEmailId: {
    type: String,
    required: true,
  },
  BuyerEmailId: {
    type: String,
    required: true,
  },
});

module.exports = Favourite = mongoose.model("Favourite", FavouriteSchema);
