const express = require("express");
const Product = require("../controllers/productControllers");

const router = express.Router();

router.route("/:id").get(Product.getProductsByShop).post(Product.createProduct);

module.exports = router;
