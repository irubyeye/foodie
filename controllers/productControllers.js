const Product = require("../models/productsModel");
const Shop = require("../models/shopsModel");

exports.createProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const shop = await Shop.findById(id);
    if (!shop) {
      return res.status(404).json({
        status: "Requested shop does not exist! ",
      });
    } else {
      req.body.shopID = id;
      const product = await Product.create(req.body);
      shop.products.push(product._id);
      await shop.save();

      res.status(201).json({
        status: "success",
        data: {
          product,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
      details: err.message,
    });
  }
};

exports.getProductsByShop = async (req, res) => {
  const shopId = req.params.id;

  try {
    const shop = await Shop.findById(shopId).populate("products").exec();

    res.status(200).json(shop.products);
  } catch (err) {
    res.status(500).json({
      message: "fail",
      error: err,
      details: err.message,
    });
  }
};
