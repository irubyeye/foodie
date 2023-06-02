const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  order: {
    type: Array,
    default: [],
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
