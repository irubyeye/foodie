const express = require("express");
const morgan = require("morgan");
const shopRouter = require("./routes/shopsRouts");
const productRouter = require("./routes/productRouts");
const orderRouter = require("./routes/orderRouts");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Routers TODO
app.use("/foodie/v1/shops", shopRouter);
app.use("/foodie/v1/products", productRouter);
app.use("/foodie/v1/orders", orderRouter);
module.exports = app;
