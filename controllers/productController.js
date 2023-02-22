const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res) => {
  res.send("create product");
};
const getAllProducts = async (req, res) => {
  res.send("get all product");
};

module.exports = { createProduct, getAllProducts };
