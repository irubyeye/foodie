const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  mainPhoto: String,
  subHeader: String,
  shopID: {
    type: String,
    required: [true, "Product must be attached to the certain shop! "],
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
