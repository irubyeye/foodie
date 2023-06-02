const Product = require("../models/shopsModel");
const Shop = require("../models/shopsModel");

exports.createNewShop = async (req, res) => {
  try {
    const newShop = await Shop.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        shop: newShop,
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

exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.status(200).json({
      status: "success",
      results: shops.length,
      data: {
        shops,
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
