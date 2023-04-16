const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res) => {
  console.log(req.body);
  const { name, price, image } = req.body;
  res.status(200).send({ name, price, image });
};

const getAllProducts = async (req, res) => {
  const {} = req.body;
  res.send("get all product");
};

module.exports = { createProduct, getAllProducts };
