const path = require("path");
const { StatusCodes } = require("http-status-codes");

const uploadProductImage = async (req, res) => {
  let productImage = req.files.image;

  const imagePath = path.join(
    __dirname,
    "../public/uploads/",
    `${productImage.name}`,
  );
  await productImage.mv(imagePath);
  res.send("upload product image ");
};

module.exports = {
  uploadProductImage,
};
