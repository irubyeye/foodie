const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Shop must have a name"],
    unique: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Shop = mongoose.model("Shop", ShopSchema);

module.exports = Shop;
