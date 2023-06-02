const express = require("express");
const Order = require("../controllers/orderController");

const router = express.Router();

router.route(`/`).get(Order.getOrders).post(Order.createOrder);

module.exports = router;
