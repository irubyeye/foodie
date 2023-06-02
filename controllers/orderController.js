const Order = require("../models/ordersModel");

exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        order: newOrder,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail!",
      message: err,
      details: err.message,
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      status: "success",
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
      details: err.message,
    });
  }
};
