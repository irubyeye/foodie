const express = require("express");
const Shop = require("../controllers/shopsControllers");

const router = express.Router();

router.route("/").get(Shop.getAllShops).post(Shop.createNewShop);

module.exports = router;
