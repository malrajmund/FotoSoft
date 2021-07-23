const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  EAN: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  priceEUR: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  minOrder: {
    type: Number,
    required: true,
  },
  deliveryTime: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDiscount: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: String,
  },
});

module.exports = Item = mongoose.model("item", ItemSchema, "item");
