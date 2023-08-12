const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");

// Create Schema for
const FoodItemSchema = new Schema({
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
  Rating: {
    type: Number,
    default: 0,
  },
  Image: {
    type: String,
  },
  Type: {
    type: String,
    required: true,
  },
  AddOns: {
    addons: [{
      type: String,
    }],
    price: [{
      type: Number,
    }],
  },
  Tags: [
    {
      type: String,
    },
  ],
  VendorEmailId: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    default: "OPEN",
  },
});

FoodItemSchema.plugin(mongoose_fuzzy_searching, { fields: ["ItemName"] });
module.exports = FoodItem = mongoose.model("FoodItems", FoodItemSchema);
