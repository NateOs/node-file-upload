const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res) => {
  console.log(req.body);
  const { name, price, image } = req.body;
  await Product.create({ name: name, price: price, image: image });
  res.status(200).send({ name, price, image });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).send({ products });
};

module.exports = { createProduct, getAllProducts };
